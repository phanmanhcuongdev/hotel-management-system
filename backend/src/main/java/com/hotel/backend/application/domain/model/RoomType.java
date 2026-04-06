package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;

public record RoomType(
        Long id,
        String name,
        BigDecimal price,
        Integer capacity
) {}