package com.hotel.backend.application.port.out.auth;

public interface PasswordEncoderPort {
    boolean matches(String rawPassword, String encodedPassword);
}
