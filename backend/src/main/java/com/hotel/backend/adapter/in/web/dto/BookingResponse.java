package com.hotel.backend.adapter.in.web.dto;

import java.time.LocalDate;

public record BookingResponse(
        Long id,
        Long userId,
        RoomShortResponse room,
        LocalDate checkIn,
        LocalDate checkOut,
        String status
) {}