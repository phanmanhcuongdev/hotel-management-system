package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.RoomResponse;
import com.hotel.backend.adapter.in.web.dto.RoomTypeResponse;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomType;

public final class RoomWebMapper {
    private RoomWebMapper() {}

    public static RoomResponse toResponse(Room room) {
        return new RoomResponse(
                room.id(),
                room.roomNumber(),
                room.status().name(),
                toRoomTypeResponse(room.type())
        );
    }

    private static RoomTypeResponse toRoomTypeResponse(RoomType roomType) {
        if (roomType == null) {
            return null;
        }

        return new RoomTypeResponse(
                roomType.id(),
                roomType.name(),
                roomType.price(),
                roomType.capacity()
        );
    }
}
