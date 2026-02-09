package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse badRequest(IllegalArgumentException ex) {
        return new ApiErrorResponse("BAD_REQUEST", ex.getMessage());
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponse conflict(IllegalStateException ex) {
        // dùng cho: Room not found / Room not available (demo đơn giản)
        return new ApiErrorResponse("CONFLICT", ex.getMessage());
    }
}