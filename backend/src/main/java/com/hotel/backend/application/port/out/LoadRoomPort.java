package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Room;

import java.util.Optional;

public interface LoadRoomPort {
    Optional<Room> loadRoomById(Long roomId);
}