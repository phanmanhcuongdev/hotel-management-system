package com.hotel.backend.application.domain.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.backend.adapter.out.persistence.SpringDataRoomRepository;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.port.in.ManagerRoomUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.application.port.out.SaveRoomPort;

@Service
@Transactional
public class RoomManagementService implements ManagerRoomUseCase{
    private final SaveRoomPort saveRoomPort;
    private final LoadRoomPort loadRoomPort;
    private final LoadRoomTypePort loadRoomTypePort;
    private final SpringDataRoomRepository roomRepo;

    public RoomManagementService(SaveRoomPort saveRoomPort, LoadRoomPort loadRoomPort, LoadRoomTypePort loadRoomTypePort, SpringDataRoomRepository roomRepo){
        this.saveRoomPort = saveRoomPort;
        this.loadRoomPort = loadRoomPort;
        this.loadRoomTypePort = loadRoomTypePort;
        this.roomRepo = roomRepo;
    }

    @Override
    public Room createRoom(String roomNumber, String status, Long roomTypeId) {
        if(roomRepo.existsByRoomNumber(roomNumber)) {
            throw new IllegalArgumentException("Số phòng đã tồn tại: " + roomNumber);
        }
        RoomType roomType = loadRoomTypePort.loadRoomTypeById(roomTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng"));
        Room room = new Room(null, roomNumber, RoomStatus.valueOf(status), roomType);
        return saveRoomPort.saveRoom(room);
    }

    @Override
    public Room updateRoom(Long id, String roomNumber, String status, Long roomTypeId) {
        if (roomRepo.existsByRoomNumberAndIdNot(roomNumber, id)) {
            throw new IllegalArgumentException("Số phòng đã tồn tại: " + roomNumber);
        }
        Room existingRoom = loadRoomPort.loadRoomById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng"));
        RoomType roomType = loadRoomTypePort.loadRoomTypeById(roomTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng"));

        Room room = new Room(existingRoom.id(), roomNumber, RoomStatus.valueOf(status), roomType);
        return saveRoomPort.saveRoom(room);
    }
}
