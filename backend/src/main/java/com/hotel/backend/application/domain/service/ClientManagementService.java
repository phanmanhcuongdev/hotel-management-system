package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.Client;
import com.hotel.backend.application.port.in.client.CreateClientCommand;
import com.hotel.backend.application.port.in.client.ManageClientUseCase;
import com.hotel.backend.application.port.in.client.UpdateClientCommand;
import com.hotel.backend.application.port.out.DeleteClientPort;
import com.hotel.backend.application.port.out.LoadClientPort;
import com.hotel.backend.application.port.out.SaveClientPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class ClientManagementService implements ManageClientUseCase {

    private final LoadClientPort loadClientPort;
    private final SaveClientPort saveClientPort;
    private final DeleteClientPort deleteClientPort;

    @Override
    public Client createClient(CreateClientCommand command) {
        String normalizedIdCard = normalizeRequired(command.idCardNumber(), "idCardNumber");
        if (loadClientPort.existsByIdCardNumber(normalizedIdCard)) {
            throw new BusinessConflictException("ID card number already exists");
        }

        String normalizedPhone = normalizeOptionalPhone(command.phoneNumber());
        if (normalizedPhone != null && loadClientPort.existsByNormalizedPhone(normalizedPhone)) {
            throw new BusinessConflictException("Phone number already exists");
        }

        return saveClientPort.createClient(
                normalizedIdCard,
                normalizeRequired(command.fullName(), "fullName"),
                normalizeRequired(command.address(), "address"),
                normalizeOptionalEmail(command.email()),
                normalizedPhone,
                normalizeOptional(command.description())
        );
    }

    @Override
    public Client updateClient(UpdateClientCommand command) {
        loadClientPort.loadClientById(command.id())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

        String normalizedIdCard = normalizeRequired(command.idCardNumber(), "idCardNumber");
        if (loadClientPort.existsByIdCardNumberAndIdNot(normalizedIdCard, command.id())) {
            throw new BusinessConflictException("ID card number already exists");
        }

        String normalizedPhone = normalizeOptionalPhone(command.phoneNumber());
        if (normalizedPhone != null && loadClientPort.existsByNormalizedPhoneAndIdNot(normalizedPhone, command.id())) {
            throw new BusinessConflictException("Phone number already exists");
        }

        return saveClientPort.updateClient(
                command.id(),
                normalizedIdCard,
                normalizeRequired(command.fullName(), "fullName"),
                normalizeRequired(command.address(), "address"),
                normalizeOptionalEmail(command.email()),
                normalizedPhone,
                normalizeOptional(command.description())
        );
    }

    @Override
    public void deleteClient(Integer id) {
        loadClientPort.loadClientById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

        if (deleteClientPort.hasBookingHistory(id)) {
            throw new BusinessConflictException("Client cannot be deleted because the profile is linked to booking history");
        }

        deleteClientPort.deleteClientById(id);
    }

    private String normalizeRequired(String value, String fieldName) {
        String normalized = value == null ? "" : value.trim();
        if (normalized.isBlank()) {
            throw new IllegalArgumentException(fieldName + " is required");
        }
        return normalized;
    }

    private String normalizeOptional(String value) {
        if (value == null) {
            return null;
        }

        String normalized = value.trim();
        return normalized.isBlank() ? null : normalized;
    }

    private String normalizeOptionalEmail(String email) {
        String normalized = normalizeOptional(email);
        return normalized == null ? null : normalized.toLowerCase();
    }

    private String normalizeOptionalPhone(String phoneNumber) {
        String normalized = normalizeOptional(phoneNumber);
        if (normalized == null) {
            return null;
        }

        String digitsOnly = normalized.replaceAll("\\D", "");
        if (digitsOnly.isBlank()) {
            throw new IllegalArgumentException("phoneNumber has invalid format");
        }

        if (digitsOnly.length() > 15) {
            throw new IllegalArgumentException("phoneNumber must contain at most 15 digits");
        }

        return digitsOnly;
    }
}
