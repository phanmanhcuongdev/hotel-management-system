package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.in.roomtype.GetRoomTypesQuery;
import com.hotel.backend.application.port.in.roomtype.GetRoomTypesUseCase;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetRoomTypesService implements GetRoomTypesUseCase {

    private final LoadRoomTypePort loadRoomTypePort;

    @Override
    public List<RoomType> getRoomTypes(GetRoomTypesQuery query) {
        return loadRoomTypePort.loadRoomTypes(query);
    }

    @Override
    public RoomType getRoomTypeById(Long id) {
        return loadRoomTypePort.loadRoomTypeById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room type not found"));
    }
}
