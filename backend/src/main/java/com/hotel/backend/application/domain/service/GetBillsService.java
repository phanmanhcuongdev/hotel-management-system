package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.BillLedgerItem;
import com.hotel.backend.application.port.in.GetBillsQuery;
import com.hotel.backend.application.port.in.GetBillsUseCase;
import com.hotel.backend.application.port.out.LoadBillLedgerPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetBillsService implements GetBillsUseCase {

    private final LoadBillLedgerPort loadBillLedgerPort;

    @Override
    public List<BillLedgerItem> getBills(GetBillsQuery query) {
        return loadBillLedgerPort.loadBills(query);
    }
}
