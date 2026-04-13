package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateClientRequest(
        @NotBlank(message = "idCardNumber is required")
        @Size(max = 50, message = "idCardNumber must be at most 50 characters")
        String idCardNumber,
        @NotBlank(message = "fullName is required")
        @Size(max = 255, message = "fullName must be at most 255 characters")
        String fullName,
        @NotBlank(message = "address is required")
        @Size(max = 255, message = "address must be at most 255 characters")
        String address,
        @Email(message = "email must be valid")
        @Size(max = 255, message = "email must be at most 255 characters")
        String email,
        @Pattern(regexp = "^[0-9+()\\-\\s]{0,20}$", message = "phoneNumber has invalid format")
        String phoneNumber,
        @Size(max = 255, message = "description must be at most 255 characters")
        String description
) {
}
