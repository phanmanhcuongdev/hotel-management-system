package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record BillSummary(
        Integer billId,
        Long bookingId,
        String bookingStatus,
        String guestName,
        String roomNumber,
        LocalDate checkIn,
        LocalDate checkOut,
        long nights,
        BigDecimal bookingDiscount,
        String bookingNote,
        BigDecimal roomCharge,
        BigDecimal serviceCharge,
        BigDecimal totalAmount,
        BigDecimal paidAmount,
        PaymentType paymentType,
        LocalDate paymentDate,
        String note,
        boolean billCreated,
        List<BillServiceItem> services
) {
}
