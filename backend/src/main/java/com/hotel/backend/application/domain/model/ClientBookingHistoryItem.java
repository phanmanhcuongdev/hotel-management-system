package com.hotel.backend.application.domain.model;

import java.time.LocalDate;

public record ClientBookingHistoryItem(
        Long bookingId,
        String guestName,
        Long roomId,
        String roomNumber,
        LocalDate checkIn,
        LocalDate checkOut,
        BookingStatus status,
        boolean checkedIn
) {
}
