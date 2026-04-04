package com.hotel.backend.application.port.in.auth;

public record LoginCommand(
        String username,
        String password
) {
}