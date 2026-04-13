package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.HotelProfile;

public interface GetHotelProfileUseCase {
    HotelProfile getProfile();
}
