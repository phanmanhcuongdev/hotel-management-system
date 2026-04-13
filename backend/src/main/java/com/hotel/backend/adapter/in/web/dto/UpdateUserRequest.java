package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateUserRequest(
        @NotBlank(message = "username is required")
        String username,
        @NotBlank(message = "fullName is required")
        String fullName,
        @NotBlank(message = "position is required")
        String position,
        String mail,
        String description
) {
}
