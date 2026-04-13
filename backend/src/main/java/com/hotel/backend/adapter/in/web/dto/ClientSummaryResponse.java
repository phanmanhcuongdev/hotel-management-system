package com.hotel.backend.adapter.in.web.dto;

public record ClientSummaryResponse(
        Integer id,
        String idCardNumber,
        String fullName,
        String address,
        String email,
        String phoneNumber,
        String description,
        boolean needsReview
) {
}
