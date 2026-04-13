package com.hotel.backend.application.port.in.report;

import com.hotel.backend.application.domain.model.report.OccupancyReport;

public interface GetOccupancyReportUseCase {
    OccupancyReport getOccupancyReport(ReportFilter filter);
}
