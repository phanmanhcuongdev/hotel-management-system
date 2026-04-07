package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.auth.LoadAuthenticatedUserUseCase;
import com.hotel.backend.application.port.out.auth.LoadUserByUsernamePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@UseCase
@RequiredArgsConstructor
public class LoadAuthenticatedUserService implements LoadAuthenticatedUserUseCase {

    private final LoadUserByUsernamePort loadUserByUsernamePort;

    @Override
    public Optional<User> loadAuthenticatedUser(String username) {
        return loadUserByUsernamePort.loadByUsername(username);
    }
}
