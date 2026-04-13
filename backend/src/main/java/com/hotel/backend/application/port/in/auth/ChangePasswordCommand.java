package com.hotel.backend.application.port.in.auth;

public record ChangePasswordCommand(
        String username,
        String currentPassword,
        String newPassword,
        String confirmPassword
) {
}
