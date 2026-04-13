package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.HotelProfileResponse;
import com.hotel.backend.application.domain.model.HotelProfile;

public final class HotelWebMapper {
    private HotelWebMapper() {
    }

    public static HotelProfileResponse toResponse(HotelProfile hotelProfile) {
        return new HotelProfileResponse(
                hotelProfile.id(),
                hotelProfile.name(),
                hotelProfile.starLevel(),
                hotelProfile.address(),
                hotelProfile.description()
        );
    }
}
