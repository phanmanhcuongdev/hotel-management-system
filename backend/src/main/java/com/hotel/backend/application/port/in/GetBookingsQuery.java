package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.BookingStatus;

import java.time.LocalDate;
import java.util.Optional;

public record GetBookingsQuery(
        Optional<String> keyword,
        Optional<BookingStatus> status,
        Optional<Long> roomId,
        Optional<String> guestName,
        Optional<String> phoneNumber,
        Optional<LocalDate> checkInDate,
        Optional<LocalDate> checkOutDate
) {
}
