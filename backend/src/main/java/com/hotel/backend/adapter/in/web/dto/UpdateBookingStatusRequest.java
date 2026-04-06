package com.hotel.backend.adapter.in.web.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateBookingStatusRequest(
        @NotNull String status
) {}
