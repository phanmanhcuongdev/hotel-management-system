package com.hotel.backend.adapter.in.web.dto;

public record BillDetailResponse(
        BillLedgerItemResponse bill,
        BillOperatorResponse processedBy,
        BillSummaryResponse summary
) {
}
