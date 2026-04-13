package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record OccupancyReportResponse(
        LocalDate startDate,
        LocalDate endDate,
        Long roomId,
        int totalOperationalRooms,
        long totalRoomDays,
        long occupiedRoomDays,
        long availableRoomDays,
        BigDecimal occupancyRate,
        BigDecimal vacancyRate,
        List<ReportDailyOccupancyResponse> dailyOccupancy,
        boolean approximateFromScheduledStays
) {
}
