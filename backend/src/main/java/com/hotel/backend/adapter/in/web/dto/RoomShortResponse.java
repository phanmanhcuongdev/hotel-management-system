package com.hotel.backend.adapter.in.web.dto;

public record RoomShortResponse(
        Long id,
        String roomNumber,
        RoomTypeShortResponse type
) {
    public record RoomTypeShortResponse(Long id, String name) {}
}