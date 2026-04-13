package com.hotel.backend.application.port.in;

public record UpdateHotelProfileCommand(
        String name,
        Integer starLevel,
        String address,
        String description
) {
}
