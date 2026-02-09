package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;

public final class RoomMapper {
    private RoomMapper() {}

    public static Room toDomain(RoomJpaEntity e) {
        return new Room(
                e.id,
                e.roomNumber,
                RoomStatus.valueOf(e.status),
                new RoomType(
                        e.roomType.id,
                        e.roomType.name,
                        e.roomType.price,
                        e.roomType.capacity
                )
        );
    }
}