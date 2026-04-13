package com.hotel.backend.application.port.in.report;

import com.hotel.backend.application.domain.model.report.ReportOverview;

public interface GetReportOverviewUseCase {
    ReportOverview getOverview(ReportFilter filter);
}
