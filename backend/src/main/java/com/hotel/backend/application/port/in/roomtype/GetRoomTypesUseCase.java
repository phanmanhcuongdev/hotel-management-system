package com.hotel.backend.application.port.in.roomtype;

import com.hotel.backend.application.domain.model.RoomType;

import java.util.List;

public interface GetRoomTypesUseCase {
    List<RoomType> getRoomTypes(GetRoomTypesQuery query);

    RoomType getRoomTypeById(Long id);
}
