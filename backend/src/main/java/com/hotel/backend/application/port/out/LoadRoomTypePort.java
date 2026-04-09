package com.hotel.backend.application.port.out;

import java.util.Optional;

import com.hotel.backend.application.domain.model.RoomType;

public interface LoadRoomTypePort {
    Optional<RoomType> loadRoomTypeById(Long id);
}
