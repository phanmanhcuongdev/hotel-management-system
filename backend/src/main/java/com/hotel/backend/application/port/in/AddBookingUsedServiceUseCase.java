package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.UsedServiceItem;

public interface AddBookingUsedServiceUseCase {
    UsedServiceItem addUsedService(AddBookingUsedServiceCommand command);
}
