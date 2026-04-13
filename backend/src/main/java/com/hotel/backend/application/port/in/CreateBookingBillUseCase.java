package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.BillSummary;

public interface CreateBookingBillUseCase {
    BillSummary createBookingBill(CreateBookingBillCommand command);
}
