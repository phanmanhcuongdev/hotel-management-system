package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record Booking(
        Long id,
        String guestName,
        String phoneNumber,
        String email,
        Long roomId,
        LocalDate checkIn,
        LocalDate checkOut,
        BookingStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Integer clientId,
        BigDecimal discount,
        String note,
        Integer userId,
        String userUsername,
        String userFullName
) {}
