package com.hotel.backend.application.port.out.auth;

import com.hotel.backend.application.domain.model.User;

import java.util.Optional;

public interface LoadUserByUsernamePort {
    Optional<User> loadByUsername(String username);
}
