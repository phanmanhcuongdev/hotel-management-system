package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record CreateBookingRequest(
        @NotBlank(message = "guestName is required")
        String guestName,

        @NotBlank(message = "phoneNumber is required")
        @Pattern(regexp = "^[0-9+()\\-\\s]{8,20}$", message = "phoneNumber has invalid format")
        String phoneNumber,

        @Email(message = "email has invalid format")
        String email,

        @NotNull(message = "roomId is required")
        Long roomId,

        @NotNull(message = "checkIn is required")
        @FutureOrPresent(message = "checkIn must be today or later")
        LocalDate checkIn,

        @NotNull(message = "checkOut is required")
        @FutureOrPresent(message = "checkOut must be today or later")
        LocalDate checkOut
) {}
