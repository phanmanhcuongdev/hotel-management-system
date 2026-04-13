package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;

public record BillServiceItem(
        Integer serviceId,
        String serviceName,
        String unit,
        int quantity,
        BigDecimal unitPrice,
        BigDecimal discount,
        BigDecimal totalAmount
) {
}
