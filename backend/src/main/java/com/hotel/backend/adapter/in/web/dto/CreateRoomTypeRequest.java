package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record CreateRoomTypeRequest(
        @NotBlank(message = "name is required")
        @Size(max = 255, message = "name must be at most 255 characters")
        String name,
        @Size(max = 500, message = "description must be at most 500 characters")
        String description,
        @NotNull(message = "price is required")
        @DecimalMin(value = "0.01", message = "price must be greater than zero")
        BigDecimal price,
        @NotNull(message = "capacity is required")
        @Positive(message = "capacity must be greater than zero")
        Integer capacity
) {
}
