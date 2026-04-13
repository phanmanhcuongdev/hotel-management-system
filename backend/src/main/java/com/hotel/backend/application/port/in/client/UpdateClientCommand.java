package com.hotel.backend.application.port.in.client;

public record UpdateClientCommand(
        Integer id,
        String idCardNumber,
        String fullName,
        String address,
        String email,
        String phoneNumber,
        String description
) {
}
