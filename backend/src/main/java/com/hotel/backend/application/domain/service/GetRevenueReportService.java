package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.report.RevenueReport;
import com.hotel.backend.application.port.in.report.GetRevenueReportUseCase;
import com.hotel.backend.application.port.in.report.ReportFilter;
import com.hotel.backend.application.port.out.report.LoadReportPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class GetRevenueReportService implements GetRevenueReportUseCase {

    private final LoadReportPort loadReportPort;
    private final ReportFilterNormalizer reportFilterNormalizer;

    @Override
    public RevenueReport getRevenueReport(ReportFilter filter) {
        ReportFilterNormalizer.NormalizedReportFilter normalized = reportFilterNormalizer.normalize(filter);
        return loadReportPort.loadRevenueReport(normalized.startDate(), normalized.endDate(), normalized.roomId());
    }
}
