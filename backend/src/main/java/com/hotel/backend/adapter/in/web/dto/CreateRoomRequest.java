package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record CreateRoomRequest(
    @NotBlank(message = "Room number is required")
    String roomNumber,

    @NotNull(message = "Room type ID is required")
    Long roomTypeId,

    @NotBlank(message = "Status is required")
    String status
)
{
    public String getRoomNumber() {
        return roomNumber;
    }

    public Long getRoomTypeId() {
        return roomTypeId;
    }

    public String getStatus() {
        return status;
    }
}
