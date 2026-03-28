package com.hotel.backend.application.port.out.auth;

import com.hotel.backend.application.domain.model.User;

public interface TokenGeneratorPort {
    String generateToken(User user);
}