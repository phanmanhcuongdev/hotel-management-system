package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.HotelProfile;

import java.util.Optional;

public interface LoadHotelProfilePort {
    Optional<HotelProfile> loadCurrentHotel();
}
