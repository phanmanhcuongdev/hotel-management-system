package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;

public record UsedServiceItem(
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
