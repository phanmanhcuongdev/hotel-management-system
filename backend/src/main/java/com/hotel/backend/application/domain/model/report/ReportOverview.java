package com.hotel.backend.application.domain.model.report;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ReportOverview(
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
        RoomRevenueItem topRevenueRoom,
        boolean revenueCalculatedFromBills,
        boolean occupancyApproximate
) {
}
