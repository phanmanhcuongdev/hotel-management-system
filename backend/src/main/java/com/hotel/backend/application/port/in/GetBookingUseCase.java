package com.hotel.backend.application.port.in;

import java.util.Optional;

public interface GetBookingUseCase {
    Optional<BookingWithRoom> getById(Long id);
}
