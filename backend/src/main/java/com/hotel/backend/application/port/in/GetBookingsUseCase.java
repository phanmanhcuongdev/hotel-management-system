package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;

import java.util.List;
import java.util.Optional;

public interface GetBookingsUseCase {
    List<Booking> getAll(Optional<BookingStatus> status);
}
