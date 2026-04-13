package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.OccupancyReportResponse;
import com.hotel.backend.adapter.in.web.dto.ReportDailyOccupancyResponse;
import com.hotel.backend.adapter.in.web.dto.ReportDailyRevenueResponse;
import com.hotel.backend.adapter.in.web.dto.ReportOverviewResponse;
import com.hotel.backend.adapter.in.web.dto.ReportRoomRevenueItemResponse;
import com.hotel.backend.adapter.in.web.dto.RevenueReportResponse;
import com.hotel.backend.application.domain.model.report.DailyOccupancyPoint;
import com.hotel.backend.application.domain.model.report.DailyRevenuePoint;
import com.hotel.backend.application.domain.model.report.OccupancyReport;
import com.hotel.backend.application.domain.model.report.ReportOverview;
import com.hotel.backend.application.domain.model.report.RevenueReport;
import com.hotel.backend.application.domain.model.report.RoomRevenueItem;

public final class ReportWebMapper {

    private ReportWebMapper() {
    }

    public static ReportOverviewResponse toResponse(ReportOverview overview) {
        return new ReportOverviewResponse(
                overview.startDate(),
                overview.endDate(),
                overview.roomId(),
                overview.totalRevenue(),
                overview.totalBills(),
                overview.averageBillAmount(),
                overview.occupiedRoomDays(),
                overview.availableRoomDays(),
                overview.occupancyRate(),
                overview.vacancyRate(),
                overview.topRevenueRoom() != null ? toResponse(overview.topRevenueRoom()) : null,
                overview.revenueCalculatedFromBills(),
                overview.occupancyApproximate()
        );
    }

    public static RevenueReportResponse toResponse(RevenueReport report) {
        return new RevenueReportResponse(
                report.startDate(),
                report.endDate(),
                report.roomId(),
                report.totalRevenue(),
                report.totalBills(),
                report.averageBillAmount(),
                report.dailyRevenue().stream().map(ReportWebMapper::toResponse).toList(),
                report.revenueByRoom().stream().map(ReportWebMapper::toResponse).toList(),
                report.calculatedFromBills()
        );
    }

    public static OccupancyReportResponse toResponse(OccupancyReport report) {
        return new OccupancyReportResponse(
                report.startDate(),
                report.endDate(),
                report.roomId(),
                report.totalOperationalRooms(),
                report.totalRoomDays(),
                report.occupiedRoomDays(),
                report.availableRoomDays(),
                report.occupancyRate(),
                report.vacancyRate(),
                report.dailyOccupancy().stream().map(ReportWebMapper::toResponse).toList(),
                report.approximateFromScheduledStays()
        );
    }

    private static ReportDailyRevenueResponse toResponse(DailyRevenuePoint point) {
        return new ReportDailyRevenueResponse(point.date(), point.revenue(), point.billCount());
    }

    private static ReportRoomRevenueItemResponse toResponse(RoomRevenueItem item) {
        return new ReportRoomRevenueItemResponse(item.roomId(), item.roomNumber(), item.revenue(), item.billCount());
    }

    private static ReportDailyOccupancyResponse toResponse(DailyOccupancyPoint point) {
        return new ReportDailyOccupancyResponse(
                point.date(),
                point.occupiedRooms(),
                point.availableRooms(),
                point.occupancyRate(),
                point.vacancyRate()
        );
    }
}
