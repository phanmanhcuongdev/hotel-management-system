package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateBookingRequest(
        @NotBlank(message = "guestName is required")
        String guestName,

        @NotBlank(message = "phoneNumber is required")
        @Pattern(regexp = "^[0-9+()\\-\\s]{8,20}$", message = "phoneNumber has invalid format")
        String phoneNumber,

        @Email(message = "email has invalid format")
        String email,

        @DecimalMin(value = "0.00", message = "discount cannot be negative")
        @Digits(integer = 13, fraction = 2, message = "discount must have up to 13 integer digits and 2 decimal places")
        BigDecimal discount,

        @Size(max = 500, message = "note must be at most 500 characters")
        String note,

        @NotNull(message = "roomId is required")
        Long roomId,

        @NotNull(message = "checkIn is required")
        @FutureOrPresent(message = "checkIn must be today or later")
        LocalDate checkIn,

        @NotNull(message = "checkOut is required")
        @FutureOrPresent(message = "checkOut must be today or later")
        LocalDate checkOut
) {}
