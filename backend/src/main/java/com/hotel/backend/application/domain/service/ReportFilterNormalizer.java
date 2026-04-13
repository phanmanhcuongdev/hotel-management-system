package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.port.in.report.ReportFilter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;

@Component
public class ReportFilterNormalizer {

    public NormalizedReportFilter normalize(ReportFilter filter) {
        LocalDate today = LocalDate.now();
        LocalDate endDate = filter.endDate().orElse(today);
        LocalDate startDate = filter.startDate().orElse(endDate.minusDays(29));

        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("endDate must not be before startDate");
        }

        return new NormalizedReportFilter(startDate, endDate, filter.roomId());
    }

    public record NormalizedReportFilter(
            LocalDate startDate,
            LocalDate endDate,
            Optional<Long> roomId
    ) {
    }
}
