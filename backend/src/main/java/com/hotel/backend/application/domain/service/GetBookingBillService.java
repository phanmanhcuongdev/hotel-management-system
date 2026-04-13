package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.BillSummary;
import com.hotel.backend.application.port.in.GetBookingBillUseCase;
import com.hotel.backend.application.port.out.LoadBillSummaryPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class GetBookingBillService implements GetBookingBillUseCase {

    private final LoadBillSummaryPort loadBillSummaryPort;

    @Override
    public BillSummary getBookingBill(Long bookingId) {
        return loadBillSummaryPort.loadBookingBillSummary(bookingId);
    }
}
