package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;

public record RoomTypeResponse(
        Long id,
        String name,
        BigDecimal price,
        Integer capacity
) {}