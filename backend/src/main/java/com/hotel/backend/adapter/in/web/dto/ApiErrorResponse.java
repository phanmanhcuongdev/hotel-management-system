package com.hotel.backend.adapter.in.web.dto;

import java.util.List;

public record ApiErrorResponse(
        String error,
        String message,
        List<FieldValidationError> details
) {
    public ApiErrorResponse(String error, String message) {
        this(error, message, List.of());
    }

    public record FieldValidationError(String field, String message) {
    }
}
