package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.application.port.out.SaveRoomPort;

import java.util.List;
import java.util.Optional;

public class RoomPersistenceAdapter implements LoadRoomsPort, LoadRoomPort, SaveRoomPort {

    private final SpringDataRoomRepository roomRepo;
    private final SpringDataRoomTypeRepository roomTypeRepo;

    public RoomPersistenceAdapter(SpringDataRoomRepository roomRepo, SpringDataRoomTypeRepository roomTypeRepo) {
        this.roomRepo = roomRepo;
        this.roomTypeRepo = roomTypeRepo;
    }

    @Override
    public List<Room> loadRooms(Optional<RoomStatus> status) {
        List<RoomJpaEntity> entities = status
                .map(s -> roomRepo.findByStatus(s.name()))
                .orElseGet(roomRepo::findAll);

        return entities.stream().map(RoomMapper::toDomain).toList();
    }

    @Override
    public Optional<Room> loadRoomById(Long roomId) {
        return roomRepo.findById(roomId).map(RoomMapper::toDomain);
    }

    @Override
    public Room save(Room room) {
        RoomTypeJpaEntity typeEntity = roomTypeRepo.findById(room.type().id())
                .orElseThrow(() -> new IllegalStateException("RoomType not found: " + room.type().id()));

        RoomJpaEntity entity = new RoomJpaEntity();
        entity.roomNumber = room.roomNumber();
        entity.status = room.status().name();
        entity.roomType = typeEntity;

        RoomJpaEntity saved = roomRepo.save(entity);
        return RoomMapper.toDomain(saved);
    }

    @Override
    public Room update(Room room) {
        RoomJpaEntity existing = roomRepo.findById(room.id())
                .orElseThrow(() -> new IllegalStateException("Room not found: " + room.id()));

        if (room.roomNumber() != null) {
            existing.roomNumber = room.roomNumber();
        }
        if (room.status() != null) {
            existing.status = room.status().name();
        }
        if (room.type() != null) {
            RoomTypeJpaEntity typeEntity = roomTypeRepo.findById(room.type().id())
                    .orElseThrow(() -> new IllegalStateException("RoomType not found: " + room.type().id()));
            existing.roomType = typeEntity;
        }

        RoomJpaEntity saved = roomRepo.save(existing);
        return RoomMapper.toDomain(saved);
    }

    @Override
    public void deleteById(Long roomId) {
        if (!roomRepo.existsById(roomId)) {
            throw new IllegalStateException("Room not found: " + roomId);
        }
        roomRepo.deleteById(roomId);
    }
}
