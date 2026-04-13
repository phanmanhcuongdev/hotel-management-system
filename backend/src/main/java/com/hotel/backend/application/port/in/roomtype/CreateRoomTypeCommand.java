package com.hotel.backend.application.port.in.roomtype;

import java.math.BigDecimal;

public record CreateRoomTypeCommand(
        String name,
        String description,
        BigDecimal price,
        Integer capacity
) {
}
