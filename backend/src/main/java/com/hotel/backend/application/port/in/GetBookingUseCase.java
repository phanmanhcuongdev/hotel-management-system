package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Booking;

import java.util.Optional;

public interface GetBookingUseCase {
    Optional<Booking> getById(Long id);
}
