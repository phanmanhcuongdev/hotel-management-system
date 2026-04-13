package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.report.OccupancyReport;
import com.hotel.backend.application.domain.model.report.ReportOverview;
import com.hotel.backend.application.domain.model.report.RevenueReport;
import com.hotel.backend.application.domain.model.report.RoomRevenueItem;
import com.hotel.backend.application.port.in.report.GetOccupancyReportUseCase;
import com.hotel.backend.application.port.in.report.GetReportOverviewUseCase;
import com.hotel.backend.application.port.in.report.GetRevenueReportUseCase;
import com.hotel.backend.application.port.in.report.ReportFilter;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.Comparator;

@UseCase
@RequiredArgsConstructor
public class GetReportOverviewService implements GetReportOverviewUseCase {

    private final GetRevenueReportUseCase getRevenueReportUseCase;
    private final GetOccupancyReportUseCase getOccupancyReportUseCase;

    @Override
    public ReportOverview getOverview(ReportFilter filter) {
        RevenueReport revenueReport = getRevenueReportUseCase.getRevenueReport(filter);
        OccupancyReport occupancyReport = getOccupancyReportUseCase.getOccupancyReport(filter);

        RoomRevenueItem topRevenueRoom = revenueReport.revenueByRoom().stream()
                .max(Comparator.comparing(RoomRevenueItem::revenue))
                .orElse(null);

        return new ReportOverview(
                revenueReport.startDate(),
                revenueReport.endDate(),
                revenueReport.roomId(),
                revenueReport.totalRevenue(),
                revenueReport.totalBills(),
                revenueReport.averageBillAmount(),
                occupancyReport.occupiedRoomDays(),
                occupancyReport.availableRoomDays(),
                occupancyReport.occupancyRate(),
                occupancyReport.vacancyRate(),
                topRevenueRoom,
                revenueReport.calculatedFromBills(),
                occupancyReport.approximateFromScheduledStays()
        );
    }
}
