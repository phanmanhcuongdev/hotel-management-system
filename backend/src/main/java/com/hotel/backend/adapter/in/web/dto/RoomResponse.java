package com.hotel.backend.adapter.in.web.dto;

public record RoomResponse(
        Long id,
        String roomNumber,
        String status,
        RoomTypeResponse type
) {}