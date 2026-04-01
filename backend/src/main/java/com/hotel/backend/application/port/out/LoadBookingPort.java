package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Booking;

import java.util.Optional;

public interface LoadBookingPort {
    Optional<Booking> loadById(Long id);
}
