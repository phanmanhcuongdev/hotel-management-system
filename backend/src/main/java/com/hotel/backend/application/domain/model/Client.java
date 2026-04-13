package com.hotel.backend.application.domain.model;

public record Client(
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
