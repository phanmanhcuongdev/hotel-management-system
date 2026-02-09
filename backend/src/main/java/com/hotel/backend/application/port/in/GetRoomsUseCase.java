package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;

import java.util.List;
import java.util.Optional;

public interface GetRoomsUseCase {
    List<Room> getRooms(Optional<RoomStatus> status);
}