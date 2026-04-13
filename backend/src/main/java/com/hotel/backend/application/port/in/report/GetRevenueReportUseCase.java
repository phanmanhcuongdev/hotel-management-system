package com.hotel.backend.application.port.in.report;

import com.hotel.backend.application.domain.model.report.RevenueReport;

public interface GetRevenueReportUseCase {
    RevenueReport getRevenueReport(ReportFilter filter);
}
