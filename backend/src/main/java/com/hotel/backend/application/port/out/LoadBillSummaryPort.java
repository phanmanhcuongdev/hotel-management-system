package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.BillSummary;

public interface LoadBillSummaryPort {
    BillSummary loadBookingBillSummary(Long bookingId);
}
