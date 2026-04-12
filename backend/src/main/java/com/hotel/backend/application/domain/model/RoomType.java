package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;

public record RoomType(
        Long id,
        String name,
        String description,
        BigDecimal price,
        Integer capacity
)
{}
