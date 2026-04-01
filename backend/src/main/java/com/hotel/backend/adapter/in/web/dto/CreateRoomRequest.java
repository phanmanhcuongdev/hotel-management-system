package com.hotel.backend.adapter.in.web.dto;

import com.hotel.backend.application.domain.model.RoomStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateRoomRequest(
        @NotBlank String roomNumber,
        @NotNull Long roomTypeId,
        @NotNull RoomStatus status
) {}
