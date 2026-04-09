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
                toDomain(e.roomType)
        );
    }

    public static RoomType toDomain(RoomTypeJpaEntity e) {
        if (e == null) return null;
        return new RoomType(e.id, e.name, e.price, e.capacity);
    }

    public static RoomJpaEntity toEntity(Room domain) {
        RoomJpaEntity entity = new RoomJpaEntity();
        entity.id = domain.id();
        entity.roomNumber = domain.roomNumber();
        entity.status = domain.status().name();

        if (domain.type() != null) {
            RoomTypeJpaEntity typeEntity = new RoomTypeJpaEntity();
            typeEntity.id = domain.type().id();
            entity.roomType = typeEntity;
        }

        return entity;
    }
}
