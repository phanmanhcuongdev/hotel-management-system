package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record UpdateBookingDetailsRequest(
        @DecimalMin(value = "0.00", message = "discount cannot be negative")
        @Digits(integer = 13, fraction = 2, message = "discount must have up to 13 integer digits and 2 decimal places")
        BigDecimal discount,

        @Size(max = 500, message = "note must be at most 500 characters")
        String note
) {}
