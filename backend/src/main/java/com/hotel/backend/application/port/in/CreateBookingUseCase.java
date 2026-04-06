package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Booking;

public interface CreateBookingUseCase {
    Booking create(CreateBookingCommand command);
}