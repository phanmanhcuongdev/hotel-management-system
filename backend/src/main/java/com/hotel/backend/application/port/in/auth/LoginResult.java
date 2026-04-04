package com.hotel.backend.application.port.in.auth;

public record LoginResult(
        Integer id,
        String username,
        String fullName,
        String position,
        String token
) {
}
