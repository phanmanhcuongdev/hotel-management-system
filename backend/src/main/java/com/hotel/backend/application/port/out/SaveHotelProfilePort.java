package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.HotelProfile;

public interface SaveHotelProfilePort {
    HotelProfile saveHotel(HotelProfile hotelProfile);
}
