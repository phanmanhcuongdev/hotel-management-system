package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@UseCase
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
        return loadRoomPort.loadRoomById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }
}
