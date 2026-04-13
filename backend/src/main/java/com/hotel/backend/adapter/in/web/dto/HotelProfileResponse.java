package com.hotel.backend.adapter.in.web.dto;

public record HotelProfileResponse(
        Integer id,
        String name,
        Integer starLevel,
        String address,
        String description
) {
}
