package com.hotel.backend.adapter.in.web.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingResponse(
        Long id,
        String guestName,
        String phoneNumber,
        String email,
        RoomShortResponse room,
        LocalDate checkIn,
        LocalDate checkOut,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}