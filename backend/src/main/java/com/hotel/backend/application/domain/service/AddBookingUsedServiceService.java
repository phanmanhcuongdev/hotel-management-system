package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.BookedRoom;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.UsedServiceItem;
import com.hotel.backend.application.port.in.AddBookingUsedServiceCommand;
import com.hotel.backend.application.port.in.AddBookingUsedServiceUseCase;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadServiceCatalogPort;
import com.hotel.backend.application.port.out.SaveUsedServicePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@UseCase
@RequiredArgsConstructor
public class AddBookingUsedServiceService implements AddBookingUsedServiceUseCase {

    private final LoadBookingPort loadBookingPort;
    private final LoadBookedRoomPort loadBookedRoomPort;
    private final LoadServiceCatalogPort loadServiceCatalogPort;
    private final SaveUsedServicePort saveUsedServicePort;

    @Override
    @Transactional
    public UsedServiceItem addUsedService(AddBookingUsedServiceCommand command) {
        Booking booking = loadBookingPort.loadBookingById(command.bookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        BookedRoom bookedRoom = loadBookedRoomPort.loadByBookingId(command.bookingId())
                .orElseThrow(() -> new BusinessConflictException("Booking has no active stay context for used services"));

        if (booking.status() != BookingStatus.CONFIRMED || !bookedRoom.checkedIn()) {
            throw new BusinessConflictException("Used services can only be added while the guest is checked in");
        }

        if (command.quantity() == null || command.quantity() <= 0) {
            throw new IllegalArgumentException("quantity must be greater than zero");
        }

        BigDecimal discount = command.discount() == null ? BigDecimal.ZERO : command.discount();
        if (discount.signum() < 0) {
            throw new IllegalArgumentException("discount cannot be negative");
        }

        loadServiceCatalogPort.loadServiceById(command.serviceId())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        return saveUsedServicePort.saveUsedService(bookedRoom.id(), command.serviceId(), command.quantity(), discount);
    }
}
