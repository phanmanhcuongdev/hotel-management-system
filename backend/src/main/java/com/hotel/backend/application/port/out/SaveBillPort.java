package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.BillSummary;
import com.hotel.backend.application.domain.model.PaymentType;

public interface SaveBillPort {
    BillSummary createBill(Long bookingId, Integer userId, PaymentType paymentType, String note);
}
