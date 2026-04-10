package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LoadBookingsPort {
    List<Booking> loadBookings(Optional<BookingStatus> status);

    boolean existsActiveOverlap(Long roomId, LocalDate checkIn, LocalDate checkOut, List<BookingStatus> statuses);
}
