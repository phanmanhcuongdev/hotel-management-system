package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.PaymentType;

import java.time.LocalDate;
import java.util.Optional;

public record GetBillsQuery(
        Optional<String> keyword,
        Optional<Long> bookingId,
        Optional<PaymentType> paymentType,
        Optional<LocalDate> paymentDateFrom,
        Optional<LocalDate> paymentDateTo
) {
}
