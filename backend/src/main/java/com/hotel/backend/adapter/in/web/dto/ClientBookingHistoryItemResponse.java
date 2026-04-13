package com.hotel.backend.adapter.in.web.dto;

import java.time.LocalDate;

public record ClientBookingHistoryItemResponse(
        Long bookingId,
        String guestName,
        Long roomId,
        String roomNumber,
        LocalDate checkIn,
        LocalDate checkOut,
        String status,
        boolean checkedIn
) {
}
