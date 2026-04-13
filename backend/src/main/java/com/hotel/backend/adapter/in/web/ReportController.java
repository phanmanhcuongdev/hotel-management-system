package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.OccupancyReportResponse;
import com.hotel.backend.adapter.in.web.dto.ReportOverviewResponse;
import com.hotel.backend.adapter.in.web.dto.RevenueReportResponse;
import com.hotel.backend.application.port.in.report.GetOccupancyReportUseCase;
import com.hotel.backend.application.port.in.report.GetReportOverviewUseCase;
import com.hotel.backend.application.port.in.report.GetRevenueReportUseCase;
import com.hotel.backend.application.port.in.report.ReportFilter;
import com.hotel.backend.config.WebAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.Optional;

@WebAdapter
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ReportController {

    private final GetReportOverviewUseCase getReportOverviewUseCase;
    private final GetRevenueReportUseCase getRevenueReportUseCase;
    private final GetOccupancyReportUseCase getOccupancyReportUseCase;

    @GetMapping("/overview")
    public ReportOverviewResponse getOverview(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                              @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                              @RequestParam(required = false) Long roomId) {
        return ReportWebMapper.toResponse(getReportOverviewUseCase.getOverview(new ReportFilter(
                Optional.ofNullable(startDate),
                Optional.ofNullable(endDate),
                Optional.ofNullable(roomId)
        )));
    }

    @GetMapping("/revenue")
    public RevenueReportResponse getRevenue(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                            @RequestParam(required = false) Long roomId) {
        return ReportWebMapper.toResponse(getRevenueReportUseCase.getRevenueReport(new ReportFilter(
                Optional.ofNullable(startDate),
                Optional.ofNullable(endDate),
                Optional.ofNullable(roomId)
        )));
    }

    @GetMapping("/occupancy")
    public OccupancyReportResponse getOccupancy(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                                @RequestParam(required = false) Long roomId) {
        return ReportWebMapper.toResponse(getOccupancyReportUseCase.getOccupancyReport(new ReportFilter(
                Optional.ofNullable(startDate),
                Optional.ofNullable(endDate),
                Optional.ofNullable(roomId)
        )));
    }
}
