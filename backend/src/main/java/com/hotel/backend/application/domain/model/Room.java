package com.hotel.backend.application.domain.model;

public record Room(
        Long id,
        String roomNumber,
        RoomStatus status,
        RoomType type
) {}