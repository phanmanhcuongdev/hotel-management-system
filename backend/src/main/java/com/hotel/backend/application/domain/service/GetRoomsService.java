package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.out.LoadRoomsPort;

import java.util.List;
import java.util.Optional;

public class GetRoomsService implements GetRoomsUseCase {

    private final LoadRoomsPort loadRoomsPort;

    public GetRoomsService(LoadRoomsPort loadRoomsPort) {
        this.loadRoomsPort = loadRoomsPort;
    }

    @Override
    public List<Room> getRooms(Optional<RoomStatus> status) {
        return loadRoomsPort.loadRooms(status);
    }
}