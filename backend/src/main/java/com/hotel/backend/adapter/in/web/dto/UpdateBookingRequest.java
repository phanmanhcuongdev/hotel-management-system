package com.hotel.backend.adapter.in.web.dto;

import com.hotel.backend.application.domain.model.BookingStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateBookingRequest(
        @NotNull BookingStatus status
) {}
