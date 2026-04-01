package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Room;

import java.util.Optional;

public interface GetRoomUseCase {
    Optional<Room> getRoomById(Long roomId);
}
