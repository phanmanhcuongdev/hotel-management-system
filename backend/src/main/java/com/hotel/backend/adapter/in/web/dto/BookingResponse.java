package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingResponse(
        Long id,
        String guestName,
        String phoneNumber,
        String email,
        Integer clientId,
        BigDecimal discount,
        String note,
        BookingStaffResponse bookedBy,
        RoomShortResponse room,
        LocalDate checkIn,
        LocalDate checkOut,
        String status,
        boolean checkedIn,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
