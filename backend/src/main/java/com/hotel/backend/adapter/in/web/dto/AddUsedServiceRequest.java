package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record AddUsedServiceRequest(
        @NotNull(message = "serviceId is required")
        Integer serviceId,
        @NotNull(message = "quantity is required")
        @Min(value = 1, message = "quantity must be greater than zero")
        Integer quantity,
        @DecimalMin(value = "0.00", message = "discount cannot be negative")
        BigDecimal discount
) {
}
