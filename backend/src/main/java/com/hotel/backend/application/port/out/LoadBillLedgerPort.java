package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.BillDetails;
import com.hotel.backend.application.domain.model.BillLedgerItem;
import com.hotel.backend.application.port.in.GetBillsQuery;

import java.util.List;
import java.util.Optional;

public interface LoadBillLedgerPort {
    List<BillLedgerItem> loadBills(GetBillsQuery query);

    Optional<BillDetails> loadBillDetail(Integer billId);
}
