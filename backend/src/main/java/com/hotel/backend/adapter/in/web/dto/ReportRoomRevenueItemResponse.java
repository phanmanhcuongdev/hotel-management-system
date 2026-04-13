package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;

public record ReportRoomRevenueItemResponse(
        Long roomId,
        String roomNumber,
        BigDecimal revenue,
        long billCount
) {
}
