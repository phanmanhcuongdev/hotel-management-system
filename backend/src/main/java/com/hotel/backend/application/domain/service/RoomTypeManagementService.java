package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.in.roomtype.CreateRoomTypeCommand;
import com.hotel.backend.application.port.in.roomtype.ManageRoomTypeUseCase;
import com.hotel.backend.application.port.in.roomtype.UpdateRoomTypeCommand;
import com.hotel.backend.application.port.out.DeleteRoomTypePort;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.application.port.out.SaveRoomTypePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@UseCase
@RequiredArgsConstructor
public class RoomTypeManagementService implements ManageRoomTypeUseCase {

    private final LoadRoomTypePort loadRoomTypePort;
    private final SaveRoomTypePort saveRoomTypePort;
    private final DeleteRoomTypePort deleteRoomTypePort;

    @Override
    public RoomType createRoomType(CreateRoomTypeCommand command) {
        String normalizedName = normalizeRequired(command.name(), "name");
        if (loadRoomTypePort.existsByName(normalizedName)) {
            throw new BusinessConflictException("Room type name already exists");
        }

        return saveRoomTypePort.saveRoomType(new RoomType(
                null,
                normalizedName,
                normalizeOptional(command.description()),
                normalizePrice(command.price()),
                normalizeCapacity(command.capacity())
        ));
    }

    @Override
    public RoomType updateRoomType(UpdateRoomTypeCommand command) {
        loadRoomTypePort.loadRoomTypeById(command.id())
                .orElseThrow(() -> new ResourceNotFoundException("Room type not found"));

        String normalizedName = normalizeRequired(command.name(), "name");
        if (loadRoomTypePort.existsByNameAndIdNot(normalizedName, command.id())) {
            throw new BusinessConflictException("Room type name already exists");
        }

        return saveRoomTypePort.saveRoomType(new RoomType(
                command.id(),
                normalizedName,
                normalizeOptional(command.description()),
                normalizePrice(command.price()),
                normalizeCapacity(command.capacity())
        ));
    }

    @Override
    public void deleteRoomType(Long id) {
        loadRoomTypePort.loadRoomTypeById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room type not found"));

        if (deleteRoomTypePort.hasRelatedRooms(id)) {
            throw new BusinessConflictException("Room type cannot be deleted because rooms still reference it");
        }

        deleteRoomTypePort.deleteRoomTypeById(id);
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

    private BigDecimal normalizePrice(BigDecimal price) {
        if (price == null) {
            throw new IllegalArgumentException("price is required");
        }

        if (price.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("price must be greater than zero");
        }

        return price;
    }

    private Integer normalizeCapacity(Integer capacity) {
        if (capacity == null) {
            throw new IllegalArgumentException("capacity is required");
        }

        if (capacity <= 0) {
            throw new IllegalArgumentException("capacity must be greater than zero");
        }

        return capacity;
    }
}
