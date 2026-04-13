package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.UsedServiceItem;

import java.util.List;

public interface GetBookingUsedServicesUseCase {
    List<UsedServiceItem> getBookingUsedServices(Long bookingId);
}
