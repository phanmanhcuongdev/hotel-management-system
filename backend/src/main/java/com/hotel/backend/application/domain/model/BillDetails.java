package com.hotel.backend.application.domain.model;

public record BillDetails(
        BillLedgerItem ledgerItem,
        Integer processedByUserId,
        String processedByUsername,
        String processedByFullName,
        BillSummary summary
) {
}
