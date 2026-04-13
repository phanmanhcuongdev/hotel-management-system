package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.out.security.JwtAuthenticationFilter;
import com.hotel.backend.adapter.out.security.JwtTokenProvider;
import com.hotel.backend.application.domain.model.report.OccupancyReport;
import com.hotel.backend.application.domain.model.report.ReportOverview;
import com.hotel.backend.application.domain.model.report.RevenueReport;
import com.hotel.backend.application.domain.model.report.RoomRevenueItem;
import com.hotel.backend.application.port.in.auth.LoadAuthenticatedUserUseCase;
import com.hotel.backend.application.port.in.report.GetOccupancyReportUseCase;
import com.hotel.backend.application.port.in.report.GetReportOverviewUseCase;
import com.hotel.backend.application.port.in.report.GetRevenueReportUseCase;
import com.hotel.backend.config.ObjectMapperConfig;
import com.hotel.backend.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({ReportController.class, GlobalExceptionHandler.class, JwtAuthenticationFilter.class, SecurityConfig.class})
@Import({GlobalExceptionHandler.class, ObjectMapperConfig.class})
class ReportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private GetReportOverviewUseCase getReportOverviewUseCase;

    @MockitoBean
    private GetRevenueReportUseCase getRevenueReportUseCase;

    @MockitoBean
    private GetOccupancyReportUseCase getOccupancyReportUseCase;

    @MockitoBean
    private JwtTokenProvider jwtTokenProvider;

    @MockitoBean
    private LoadAuthenticatedUserUseCase loadAuthenticatedUserUseCase;

    @Test
    void overviewReturnsSummaryPayload() throws Exception {
        when(getReportOverviewUseCase.getOverview(any())).thenReturn(new ReportOverview(
                LocalDate.of(2026, 4, 1),
                LocalDate.of(2026, 4, 10),
                null,
                BigDecimal.valueOf(225),
                1,
                BigDecimal.valueOf(225),
                3,
                7,
                BigDecimal.valueOf(30),
                BigDecimal.valueOf(70),
                new RoomRevenueItem(1L, "101", BigDecimal.valueOf(225), 1),
                true,
                true
        ));

        mockMvc.perform(get("/api/reports/overview")
                        .with(user("admin").roles("ADMIN"))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalRevenue").value(225))
                .andExpect(jsonPath("$.topRevenueRoom.roomNumber").value("101"))
                .andExpect(jsonPath("$.occupancyApproximate").value(true));
    }

    @Test
    void revenueReturnsDailyAndRoomBreakdown() throws Exception {
        when(getRevenueReportUseCase.getRevenueReport(any())).thenReturn(new RevenueReport(
                LocalDate.of(2026, 4, 1),
                LocalDate.of(2026, 4, 10),
                null,
                BigDecimal.valueOf(225),
                1,
                BigDecimal.valueOf(225),
                List.of(),
                List.of(new RoomRevenueItem(1L, "101", BigDecimal.valueOf(225), 1)),
                true
        ));

        mockMvc.perform(get("/api/reports/revenue")
                        .with(user("admin").roles("ADMIN"))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalBills").value(1))
                .andExpect(jsonPath("$.revenueByRoom[0].roomNumber").value("101"))
                .andExpect(jsonPath("$.calculatedFromBills").value(true));
    }

    @Test
    void occupancyReturnsApproximateFlag() throws Exception {
        when(getOccupancyReportUseCase.getOccupancyReport(any())).thenReturn(new OccupancyReport(
                LocalDate.of(2026, 4, 1),
                LocalDate.of(2026, 4, 10),
                null,
                10,
                100,
                30,
                70,
                BigDecimal.valueOf(30),
                BigDecimal.valueOf(70),
                List.of(),
                true
        ));

        mockMvc.perform(get("/api/reports/occupancy")
                        .with(user("admin").roles("ADMIN"))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalOperationalRooms").value(10))
                .andExpect(jsonPath("$.occupancyRate").value(30))
                .andExpect(jsonPath("$.approximateFromScheduledStays").value(true));
    }
}
