package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.UpdateBookingUseCase;
import com.hotel.backend.application.port.out.UpdateBookingPort;

public class UpdateBookingService implements UpdateBookingUseCase {

    private final UpdateBookingPort updateBookingPort;

    public UpdateBookingService(UpdateBookingPort updateBookingPort) {
        this.updateBookingPort = updateBookingPort;
    }

    @Override
    public Booking updateStatus(Long id, BookingStatus status) {
        return updateBookingPort.updateStatus(id, status);
    }
}
