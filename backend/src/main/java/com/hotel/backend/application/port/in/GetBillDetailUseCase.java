package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.BillDetails;

import java.util.Optional;

public interface GetBillDetailUseCase {
    Optional<BillDetails> getBillDetail(Integer billId);
}
