package com.hotel.backend.application.port.in.auth;

import com.hotel.backend.application.domain.model.User;

import java.util.Optional;

public interface LoadAuthenticatedUserUseCase {
    Optional<User> loadAuthenticatedUser(String username);
}
