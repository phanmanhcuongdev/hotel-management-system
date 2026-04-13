package com.hotel.backend.application.port.in.roomtype;

import com.hotel.backend.application.domain.model.RoomType;

public interface ManageRoomTypeUseCase {
    RoomType createRoomType(CreateRoomTypeCommand command);

    RoomType updateRoomType(UpdateRoomTypeCommand command);

    void deleteRoomType(Long id);
}
