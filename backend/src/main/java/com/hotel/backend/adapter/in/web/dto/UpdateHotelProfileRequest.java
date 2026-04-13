package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateHotelProfileRequest(
        @NotBlank(message = "name is required")
        @Size(max = 255, message = "name must be at most 255 characters")
        String name,

        @NotNull(message = "starLevel is required")
        @Min(value = 1, message = "starLevel must be between 1 and 5")
        @Max(value = 5, message = "starLevel must be between 1 and 5")
        Integer starLevel,

        @NotBlank(message = "address is required")
        @Size(max = 255, message = "address must be at most 255 characters")
        String address,

        @Size(max = 500, message = "description must be at most 500 characters")
        String description
) {
}
