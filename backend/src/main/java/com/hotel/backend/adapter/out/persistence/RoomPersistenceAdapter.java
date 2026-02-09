package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;

import java.util.List;
import java.util.Optional;

public class RoomPersistenceAdapter implements LoadRoomsPort, LoadRoomPort {

    private final SpringDataRoomRepository roomRepo;

    public RoomPersistenceAdapter(SpringDataRoomRepository roomRepo) {
        this.roomRepo = roomRepo;
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
}