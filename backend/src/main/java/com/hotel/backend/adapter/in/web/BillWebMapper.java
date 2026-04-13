package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BillServiceItemResponse;
import com.hotel.backend.adapter.in.web.dto.BillDetailResponse;
import com.hotel.backend.adapter.in.web.dto.BillLedgerItemResponse;
import com.hotel.backend.adapter.in.web.dto.BillOperatorResponse;
import com.hotel.backend.adapter.in.web.dto.BillSummaryResponse;
import com.hotel.backend.application.domain.model.BillDetails;
import com.hotel.backend.application.domain.model.BillLedgerItem;
import com.hotel.backend.application.domain.model.BillSummary;

public final class BillWebMapper {
    private BillWebMapper() {
    }

    public static BillSummaryResponse toResponse(BillSummary summary) {
        return new BillSummaryResponse(
                summary.billId(),
                summary.bookingId(),
                summary.bookingStatus(),
                summary.guestName(),
                summary.roomNumber(),
                summary.checkIn(),
                summary.checkOut(),
                summary.nights(),
                summary.bookingDiscount(),
                summary.bookingNote(),
                summary.roomCharge(),
                summary.serviceCharge(),
                summary.totalAmount(),
                summary.paidAmount(),
                summary.paymentType() != null ? summary.paymentType().name() : null,
                summary.paymentDate(),
                summary.note(),
                summary.billCreated(),
                summary.services().stream()
                        .map(item -> new BillServiceItemResponse(
                                item.serviceId(),
                                item.serviceName(),
                                item.unit(),
                                item.quantity(),
                                item.unitPrice(),
                                item.discount(),
                                item.totalAmount()
                        ))
                        .toList()
        );
    }

    public static BillLedgerItemResponse toResponse(BillLedgerItem item) {
        return new BillLedgerItemResponse(
                item.billId(),
                item.bookingId(),
                item.guestName(),
                item.roomNumber(),
                item.bookingStatus(),
                item.paymentAmount(),
                item.paymentType() != null ? item.paymentType().name() : null,
                item.paymentDate(),
                item.note()
        );
    }

    public static BillDetailResponse toResponse(BillDetails details) {
        return new BillDetailResponse(
                toResponse(details.ledgerItem()),
                details.processedByUserId() != null
                        ? new BillOperatorResponse(details.processedByUserId(), details.processedByUsername(), details.processedByFullName())
                        : null,
                toResponse(details.summary())
        );
    }
}
