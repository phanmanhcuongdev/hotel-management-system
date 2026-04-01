package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.in.GetRoomUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveRoomPort;

import java.util.Optional;

public class GetRoomService implements GetRoomUseCase {

    private final LoadRoomPort loadRoomPort;

    public GetRoomService(LoadRoomPort loadRoomPort) {
        this.loadRoomPort = loadRoomPort;
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return loadRoomPort.loadRoomById(roomId);
    }
}
