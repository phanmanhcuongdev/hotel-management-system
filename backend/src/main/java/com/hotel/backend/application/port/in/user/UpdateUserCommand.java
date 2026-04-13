package com.hotel.backend.application.port.in.user;

public record UpdateUserCommand(
        Integer id,
        String username,
        String fullName,
        String position,
        String mail,
        String description
) {
}
