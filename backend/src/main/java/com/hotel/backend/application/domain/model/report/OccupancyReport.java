package com.hotel.backend.application.domain.model.report;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record OccupancyReport(
        LocalDate startDate,
        LocalDate endDate,
        Long roomId,
        int totalOperationalRooms,
        long totalRoomDays,
        long occupiedRoomDays,
        long availableRoomDays,
        BigDecimal occupancyRate,
        BigDecimal vacancyRate,
        List<DailyOccupancyPoint> dailyOccupancy,
        boolean approximateFromScheduledStays
) {
}
