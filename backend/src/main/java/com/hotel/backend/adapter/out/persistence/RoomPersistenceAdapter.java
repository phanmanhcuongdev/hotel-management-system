package com.hotel.backend.adapter.out.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.application.port.out.SaveRoomPort;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RoomPersistenceAdapter implements LoadRoomsPort, LoadRoomPort, SaveRoomPort, LoadRoomTypePort {

    private final SpringDataRoomRepository roomRepo;
    private final SpringDataRoomTypeRepository roomTypeRepo;

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
    public Room saveRoom(Room room){
        RoomJpaEntity entity = RoomMapper.toEntity(room);
        RoomJpaEntity saved = roomRepo.save(entity);
        return RoomMapper.toDomain(saved);
    }

    @Override
    public Optional<RoomType> loadRoomTypeById(Long id) {
        return roomTypeRepo.findById(id).map(RoomMapper::toDomain);
    }

    @Override
    public boolean existsByRoomNumber(String roomNumber) {
        return roomRepo.existsByRoomNumber(roomNumber);
    }

    @Override
    public boolean existsByRoomNumberAndIdNot(String roomNumber, Long id) {
        return roomRepo.existsByRoomNumberAndIdNot(roomNumber, id);
    }
}
