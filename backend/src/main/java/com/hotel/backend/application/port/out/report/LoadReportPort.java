package com.hotel.backend.application.port.out.report;

import com.hotel.backend.application.domain.model.report.OccupancyReport;
import com.hotel.backend.application.domain.model.report.RevenueReport;

import java.time.LocalDate;
import java.util.Optional;

public interface LoadReportPort {
    RevenueReport loadRevenueReport(LocalDate startDate, LocalDate endDate, Optional<Long> roomId);

    OccupancyReport loadOccupancyReport(LocalDate startDate, LocalDate endDate, Optional<Long> roomId);
}
