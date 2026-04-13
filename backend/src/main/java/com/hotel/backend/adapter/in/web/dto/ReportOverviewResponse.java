package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ReportOverviewResponse(
        LocalDate startDate,
        LocalDate endDate,
        Long roomId,
        BigDecimal totalRevenue,
        long totalBills,
        BigDecimal averageBillAmount,
        long occupiedRoomDays,
        long availableRoomDays,
        BigDecimal occupancyRate,
        BigDecimal vacancyRate,
        ReportRoomRevenueItemResponse topRevenueRoom,
        boolean revenueCalculatedFromBills,
        boolean occupancyApproximate
) {
}
