package com.hotel.backend.application.domain.model;

import java.time.LocalDate;

public record Booking(
        Long id,
        Long userId,
        Long roomId,
        LocalDate checkIn,
        LocalDate checkOut,
        BookingStatus status
) {}