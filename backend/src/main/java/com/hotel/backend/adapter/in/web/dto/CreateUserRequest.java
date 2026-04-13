package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
        @NotBlank(message = "username is required")
        String username,
        @NotBlank(message = "password is required")
        @Size(min = 6, message = "password must be at least 6 characters")
        String password,
        @NotBlank(message = "fullName is required")
        String fullName,
        @NotBlank(message = "position is required")
        String position,
        String mail,
        String description
) {
}
