package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.BillDetails;
import com.hotel.backend.application.port.in.GetBillDetailUseCase;
import com.hotel.backend.application.port.out.LoadBillLedgerPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@UseCase
@RequiredArgsConstructor
public class GetBillDetailService implements GetBillDetailUseCase {

    private final LoadBillLedgerPort loadBillLedgerPort;

    @Override
    public Optional<BillDetails> getBillDetail(Integer billId) {
        return loadBillLedgerPort.loadBillDetail(billId);
    }
}
