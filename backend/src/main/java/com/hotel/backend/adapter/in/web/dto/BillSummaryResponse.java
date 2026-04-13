package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record BillSummaryResponse(
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
        String paymentType,
        LocalDate paymentDate,
        String note,
        boolean billCreated,
        List<BillServiceItemResponse> services
) {
}
