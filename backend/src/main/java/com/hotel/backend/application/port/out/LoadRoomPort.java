package com.hotel.backend.application.port.out;

import java.util.Optional;

import com.hotel.backend.application.domain.model.Room;

public interface LoadRoomPort {
    Optional<Room> loadRoomById(Long roomId);

    boolean existsByRoomNumber(String roomNumber);
    boolean existsByRoomNumberAndIdNot(String roomNumber, Long id);
}

