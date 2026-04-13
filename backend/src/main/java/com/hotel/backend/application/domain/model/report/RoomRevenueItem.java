package com.hotel.backend.application.domain.model.report;

import java.math.BigDecimal;

public record RoomRevenueItem(
        Long roomId,
        String roomNumber,
        BigDecimal revenue,
        long billCount
) {
}
