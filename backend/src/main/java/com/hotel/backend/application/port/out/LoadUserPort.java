package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.User;

import java.util.Optional;

public interface LoadUserPort {
    Optional<User> loadByUsername(String username);
}
