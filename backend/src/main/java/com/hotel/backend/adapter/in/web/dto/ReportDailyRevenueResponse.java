package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ReportDailyRevenueResponse(
        LocalDate date,
        BigDecimal revenue,
        long billCount
) {
}
