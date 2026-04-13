package com.hotel.backend.application.port.in.user;

public record CreateUserCommand(
        String username,
        String password,
        String fullName,
        String position,
        String mail,
        String description
) {
}
