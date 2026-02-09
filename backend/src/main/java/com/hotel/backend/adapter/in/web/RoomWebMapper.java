package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.RoomResponse;
import com.hotel.backend.adapter.in.web.dto.RoomTypeResponse;
import com.hotel.backend.application.domain.model.Room;

public final class RoomWebMapper {
    private RoomWebMapper() {}

    public static RoomResponse toResponse(Room r) {
        return new RoomResponse(
                r.id(),
                r.roomNumber(),
                r.status().name(),
                new RoomTypeResponse(
                        r.type().id(),
                        r.type().name(),
                        r.type().price(),
                        r.type().capacity()
                )
        );
    }
}