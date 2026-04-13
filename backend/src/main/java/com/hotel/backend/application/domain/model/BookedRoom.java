package com.hotel.backend.application.domain.model;

import java.time.LocalDate;

public record BookedRoom(
        Integer id,
        Long bookingId,
        Long roomId,
        LocalDate checkIn,
        LocalDate checkOut,
        boolean checkedIn
) {
}
