package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;

public record UsedServiceResponse(
        Integer id,
        Integer serviceId,
        String serviceName,
        String unit,
        Integer bookedRoomId,
        int quantity,
        BigDecimal unitPrice,
        BigDecimal discount,
        BigDecimal totalAmount
) {
}
