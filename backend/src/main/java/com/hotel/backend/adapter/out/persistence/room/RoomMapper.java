package com.hotel.backend.adapter.out.persistence.room;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;

public final class RoomMapper {
    private RoomMapper() {}

    public static Room toDomain(RoomEntity entity) {
        return new Room(
                entity.id,
                entity.roomNumber,
                RoomStatus.valueOf(entity.status),
                toDomain(entity.roomType)
        );
    }

    public static RoomType toDomain(RoomTypeEntity entity) {
        if (entity == null) {
            return null;
        }

        return new RoomType(entity.id, entity.name, entity.price, entity.capacity);
    }

    public static RoomEntity toEntity(Room room) {
        RoomEntity entity = new RoomEntity();
        entity.id = room.id();
        entity.roomNumber = room.roomNumber();
        entity.status = room.status().name();

        if (room.type() != null) {
            RoomTypeEntity roomTypeEntity = new RoomTypeEntity();
            roomTypeEntity.id = room.type().id();
            entity.roomType = roomTypeEntity;
        }

        return entity;
    }
}
