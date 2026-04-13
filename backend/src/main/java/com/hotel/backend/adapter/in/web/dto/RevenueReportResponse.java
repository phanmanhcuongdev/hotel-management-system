package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record RevenueReportResponse(
        LocalDate startDate,
        LocalDate endDate,
        Long roomId,
        BigDecimal totalRevenue,
        long totalBills,
        BigDecimal averageBillAmount,
        List<ReportDailyRevenueResponse> dailyRevenue,
        List<ReportRoomRevenueItemResponse> revenueByRoom,
        boolean calculatedFromBills
) {
}
