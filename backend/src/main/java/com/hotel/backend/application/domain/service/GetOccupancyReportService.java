package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.report.OccupancyReport;
import com.hotel.backend.application.port.in.report.GetOccupancyReportUseCase;
import com.hotel.backend.application.port.in.report.ReportFilter;
import com.hotel.backend.application.port.out.report.LoadReportPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class GetOccupancyReportService implements GetOccupancyReportUseCase {

    private final LoadReportPort loadReportPort;
    private final ReportFilterNormalizer reportFilterNormalizer;

    @Override
    public OccupancyReport getOccupancyReport(ReportFilter filter) {
        ReportFilterNormalizer.NormalizedReportFilter normalized = reportFilterNormalizer.normalize(filter);
        return loadReportPort.loadOccupancyReport(normalized.startDate(), normalized.endDate(), normalized.roomId());
    }
}
