package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;

import java.util.List;
import java.util.Optional;

public interface LoadRoomsPort {
    List<Room> loadRooms(Optional<RoomStatus> status);
}