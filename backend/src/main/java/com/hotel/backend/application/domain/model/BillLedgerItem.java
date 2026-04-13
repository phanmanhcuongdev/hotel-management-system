package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BillLedgerItem(
        Integer billId,
        Long bookingId,
        String guestName,
        String roomNumber,
        String bookingStatus,
        BigDecimal paymentAmount,
        PaymentType paymentType,
        LocalDate paymentDate,
        String note
) {
}
