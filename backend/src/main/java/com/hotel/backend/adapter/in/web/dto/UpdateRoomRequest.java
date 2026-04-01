package com.hotel.backend.adapter.in.web.dto;

import com.hotel.backend.application.domain.model.RoomStatus;

public record UpdateRoomRequest(
        String roomNumber,
        Long roomTypeId,
        RoomStatus status
) {}
