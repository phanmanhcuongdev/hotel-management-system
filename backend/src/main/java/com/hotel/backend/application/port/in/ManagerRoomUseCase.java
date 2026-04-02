package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Room;

public interface ManagerRoomUseCase {
    Room createRoom(String roomNumber, String status, Long roomTypeId);

    Room updateRoom(Long id, String roomNumber, String status, Long roomTypeId);
}
