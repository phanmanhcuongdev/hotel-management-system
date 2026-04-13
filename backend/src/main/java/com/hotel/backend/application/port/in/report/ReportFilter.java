package com.hotel.backend.application.port.in.report;

import java.time.LocalDate;
import java.util.Optional;

public record ReportFilter(
        Optional<LocalDate> startDate,
        Optional<LocalDate> endDate,
        Optional<Long> roomId
) {
}
