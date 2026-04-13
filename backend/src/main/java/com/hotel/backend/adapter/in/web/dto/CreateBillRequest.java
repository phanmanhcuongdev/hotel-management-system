package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateBillRequest(
        @NotBlank(message = "paymentType is required")
        String paymentType,
        String note
) {
}
