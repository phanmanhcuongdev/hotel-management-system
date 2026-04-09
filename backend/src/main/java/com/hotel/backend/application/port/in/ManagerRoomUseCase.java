package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;

public interface ManagerRoomUseCase {
    Room createRoom(String roomNumber, RoomStatus status, Long roomTypeId);

    Room updateRoom(Long id, String roomNumber, RoomStatus status, Long roomTypeId);
}
