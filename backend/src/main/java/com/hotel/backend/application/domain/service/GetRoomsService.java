package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.GetRoomsQuery;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetRoomsService implements GetRoomsUseCase {

    private final LoadRoomsPort loadRoomsPort;
    private final LoadRoomPort loadRoomPort;

    @Override
    public List<Room> getRooms(GetRoomsQuery query) {
        return loadRoomsPort.loadRooms(query);
    }

    @Override
    public Room getRoomById(Long id) {
        return loadRoomPort.loadRoomById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }
}
