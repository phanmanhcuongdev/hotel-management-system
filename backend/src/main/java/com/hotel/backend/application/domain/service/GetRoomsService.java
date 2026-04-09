package com.hotel.backend.application.domain.service;

import java.util.List;
import java.util.Optional;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetRoomsService implements GetRoomsUseCase {

    private final LoadRoomsPort loadRoomsPort;
    private final LoadRoomPort loadRoomPort;

    @Override
    public List<Room> getRooms(Optional<RoomStatus> status) {
        return loadRoomsPort.loadRooms(status);
    }

    @Override
    public Room getRoomById(Long id) {
        return loadRoomPort.loadRoomById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy phòng"));
    }
}
