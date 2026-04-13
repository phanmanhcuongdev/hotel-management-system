package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.UsedServiceItem;

import java.math.BigDecimal;

public interface SaveUsedServicePort {
    UsedServiceItem saveUsedService(Integer bookedRoomId, Integer serviceId, Integer quantity, BigDecimal discount);
}
