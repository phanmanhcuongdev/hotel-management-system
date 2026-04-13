package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BillLedgerItemResponse(
        Integer billId,
        Long bookingId,
        String guestName,
        String roomNumber,
        String bookingStatus,
        BigDecimal paymentAmount,
        String paymentType,
        LocalDate paymentDate,
        String note
) {
}
