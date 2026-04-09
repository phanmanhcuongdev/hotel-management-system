package com.hotel.backend.adapter.in.web.dto;

import com.hotel.backend.application.domain.model.RoomStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateRoomRequest(
    @NotBlank(message = "Room number is required")
    String roomNumber,

    @NotNull(message = "Room type ID is required")
    Long roomTypeId,

    @NotNull(message = "Status is required")
    RoomStatus status
)
{

}
