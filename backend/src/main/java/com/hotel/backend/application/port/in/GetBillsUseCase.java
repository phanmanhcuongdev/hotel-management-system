package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.BillLedgerItem;

import java.util.List;

public interface GetBillsUseCase {
    List<BillLedgerItem> getBills(GetBillsQuery query);
}
