package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse validationError(MethodArgumentNotValidException ex,
                                             HttpServletRequest request) {
        Map<String, Object> details = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        fe -> fe.getField(),
                        fe -> fe.getDefaultMessage() != null ? fe.getDefaultMessage() : "invalid",
                        (a, b) -> a
                ));
        return new ApiErrorResponse("VALIDATION_ERROR", "Validation failed", details,
                Instant.now(), request.getRequestURI());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse badRequest(IllegalArgumentException ex, HttpServletRequest request) {
        return new ApiErrorResponse("BAD_REQUEST", ex.getMessage(), Map.of(),
                Instant.now(), request.getRequestURI());
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponse conflict(IllegalStateException ex, HttpServletRequest request) {
        return new ApiErrorResponse("CONFLICT", ex.getMessage(), Map.of(),
                Instant.now(), request.getRequestURI());
    }
}