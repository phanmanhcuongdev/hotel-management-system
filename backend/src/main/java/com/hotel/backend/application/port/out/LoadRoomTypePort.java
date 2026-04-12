package com.hotel.backend.application.port.out;

import com.hotel.backend.application.port.in.roomtype.GetRoomTypesQuery;

import java.util.List;
import java.util.Optional;

import com.hotel.backend.application.domain.model.RoomType;

public interface LoadRoomTypePort {
    List<RoomType> loadRoomTypes(GetRoomTypesQuery query);

    Optional<RoomType> loadRoomTypeById(Long id);

    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Long id);
}
