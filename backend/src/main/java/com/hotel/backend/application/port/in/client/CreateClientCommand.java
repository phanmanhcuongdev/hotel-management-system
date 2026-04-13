package com.hotel.backend.application.port.in.client;

public record CreateClientCommand(
        String idCardNumber,
        String fullName,
        String address,
        String email,
        String phoneNumber,
        String description
) {
}
