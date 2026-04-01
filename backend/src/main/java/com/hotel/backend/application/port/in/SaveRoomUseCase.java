package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;

public interface SaveRoomUseCase {
    Room create(String roomNumber, Long roomTypeId, RoomStatus status);
    Room update(Long roomId, String roomNumber, Long roomTypeId, RoomStatus status);
    void delete(Long roomId);
}
