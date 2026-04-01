package com.hotel.backend.application.domain.service;

import com.hotel.backend.adapter.out.persistence.SpringDataRoomRepository;
import com.hotel.backend.adapter.out.persistence.SpringDataRoomTypeRepository;
import com.hotel.backend.adapter.out.persistence.RoomTypeJpaEntity;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.in.SaveRoomUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveRoomPort;

public class RoomService implements SaveRoomUseCase {

    private final SaveRoomPort saveRoomPort;
    private final LoadRoomPort loadRoomPort;
    private final SpringDataRoomRepository roomRepo;
    private final SpringDataRoomTypeRepository roomTypeRepo;

    public RoomService(SaveRoomPort saveRoomPort, LoadRoomPort loadRoomPort, SpringDataRoomRepository roomRepo, SpringDataRoomTypeRepository roomTypeRepo) {
        this.saveRoomPort = saveRoomPort;
        this.loadRoomPort = loadRoomPort;
        this.roomRepo = roomRepo;
        this.roomTypeRepo = roomTypeRepo;
    }

    @Override
    public Room create(String roomNumber, Long roomTypeId, RoomStatus status) {
        if (roomRepo.existsByRoomNumber(roomNumber)) {
            throw new IllegalArgumentException("Room number already exists: " + roomNumber);
        }

        RoomTypeJpaEntity typeEntity = roomTypeRepo.findById(roomTypeId)
                .orElseThrow(() -> new IllegalStateException("RoomType not found: " + roomTypeId));

        RoomType type = new RoomType(
                typeEntity.id,
                typeEntity.name,
                typeEntity.price,
                typeEntity.capacity
        );

        Room room = new Room(null, roomNumber, status, type);
        return saveRoomPort.save(room);
    }

    @Override
    public Room update(Long roomId, String roomNumber, Long roomTypeId, RoomStatus status) {
        Room existing = loadRoomPort.loadRoomById(roomId)
                .orElseThrow(() -> new IllegalStateException("Room not found: " + roomId));

        if (roomNumber != null && !roomNumber.equals(existing.roomNumber())) {
            if (roomRepo.existsByRoomNumber(roomNumber)) {
                throw new IllegalArgumentException("Room number already exists: " + roomNumber);
            }
        }

        RoomType type = existing.type();
        if (roomTypeId != null && !roomTypeId.equals(existing.type().id())) {
            RoomTypeJpaEntity typeEntity = roomTypeRepo.findById(roomTypeId)
                    .orElseThrow(() -> new IllegalStateException("RoomType not found: " + roomTypeId));
            type = new RoomType(typeEntity.id, typeEntity.name, typeEntity.price, typeEntity.capacity);
        }

        RoomStatus newStatus = status != null ? status : existing.status();
        String newRoomNumber = roomNumber != null ? roomNumber : existing.roomNumber();

        Room updated = new Room(roomId, newRoomNumber, newStatus, type);
        return saveRoomPort.update(updated);
    }

    @Override
    public void delete(Long roomId) {
        saveRoomPort.deleteById(roomId);
    }
}
