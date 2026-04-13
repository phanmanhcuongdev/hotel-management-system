package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;

public record BillServiceItemResponse(
        Integer serviceId,
        String serviceName,
        String unit,
        int quantity,
        BigDecimal unitPrice,
        BigDecimal discount,
        BigDecimal totalAmount
) {
}
