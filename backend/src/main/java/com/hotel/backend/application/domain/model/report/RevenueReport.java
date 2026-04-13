package com.hotel.backend.application.domain.model.report;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record RevenueReport(
        LocalDate startDate,
        LocalDate endDate,
        Long roomId,
        BigDecimal totalRevenue,
        long totalBills,
        BigDecimal averageBillAmount,
        List<DailyRevenuePoint> dailyRevenue,
        List<RoomRevenueItem> revenueByRoom,
        boolean calculatedFromBills
) {
}
