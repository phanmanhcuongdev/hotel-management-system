package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.UsedServiceItem;

import java.util.List;

public interface LoadUsedServicePort {
    List<UsedServiceItem> loadUsedServicesByBookedRoomId(Integer bookedRoomId);
}
