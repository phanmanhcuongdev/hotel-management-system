package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ReportDailyOccupancyResponse(
        LocalDate date,
        int occupiedRooms,
        int availableRooms,
        BigDecimal occupancyRate,
        BigDecimal vacancyRate
) {
}
