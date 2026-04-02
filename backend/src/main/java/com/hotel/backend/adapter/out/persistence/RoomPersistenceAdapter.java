package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.application.port.out.SaveRoomPort;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

@Component
public class RoomPersistenceAdapter implements LoadRoomsPort, LoadRoomPort, SaveRoomPort, LoadRoomTypePort {

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
    public Room saveRoom(Room room){
        RoomJpaEntity entity = RoomMapper.toEntity(room);
        RoomJpaEntity saved = roomRepo.save(entity);
        return RoomMapper.toDomain(saved);
    }

    @Override
    public Optional<RoomType> loadRoomTypeById(Long id) {
        return roomTypeRepo.findById(id).map(RoomMapper::toDomain);
    }
}
