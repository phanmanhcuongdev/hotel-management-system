package com.hotel.backend.application.domain.model.report;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DailyRevenuePoint(
        LocalDate date,
        BigDecimal revenue,
        long billCount
) {
}
