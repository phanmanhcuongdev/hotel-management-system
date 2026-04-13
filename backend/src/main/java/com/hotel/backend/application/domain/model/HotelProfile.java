package com.hotel.backend.application.domain.model;

public record HotelProfile(
        Integer id,
        String name,
        Integer starLevel,
        String address,
        String description
) {
}
