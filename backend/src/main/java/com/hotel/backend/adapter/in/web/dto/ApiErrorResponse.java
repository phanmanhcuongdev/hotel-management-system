package com.hotel.backend.adapter.in.web.dto;

import java.time.Instant;
import java.util.Map;

public record ApiErrorResponse(
        String code,
        String message,
        Map<String, Object> details,
        Instant timestamp,
        String path
) {}