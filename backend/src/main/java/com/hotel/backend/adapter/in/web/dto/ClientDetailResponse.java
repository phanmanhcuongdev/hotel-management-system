package com.hotel.backend.adapter.in.web.dto;

import java.util.List;

public record ClientDetailResponse(
        Integer id,
        String idCardNumber,
        String fullName,
        String address,
        String email,
        String phoneNumber,
        String description,
        boolean needsReview,
        List<ClientBookingHistoryItemResponse> bookingHistory
) {
}
