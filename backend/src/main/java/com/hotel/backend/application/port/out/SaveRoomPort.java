package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Room;

public interface SaveRoomPort {
    Room save(Room room);
    Room update(Room room);
    void deleteById(Long roomId);
}
