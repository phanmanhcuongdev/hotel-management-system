package com.hotel.backend.application.domain.model.report;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DailyOccupancyPoint(
        LocalDate date,
        int occupiedRooms,
        int availableRooms,
        BigDecimal occupancyRate,
        BigDecimal vacancyRate
) {
}
