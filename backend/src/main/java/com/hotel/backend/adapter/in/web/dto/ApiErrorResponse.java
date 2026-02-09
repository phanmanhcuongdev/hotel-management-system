package com.hotel.backend.adapter.in.web.dto;

public record ApiErrorResponse(
        String error,
        String message
) {}