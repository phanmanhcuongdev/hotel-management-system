package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.InvalidCredentialsException;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.auth.LoginCommand;
import com.hotel.backend.application.port.in.auth.LoginResult;
import com.hotel.backend.application.port.in.auth.LoginUseCase;
import com.hotel.backend.application.port.out.auth.LoadUserByUsernamePort;
import com.hotel.backend.application.port.out.auth.PasswordEncoderPort;
import com.hotel.backend.application.port.out.auth.TokenGeneratorPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class LoginService implements LoginUseCase {

    private final LoadUserByUsernamePort loadUserByUsernamePort;
    private final PasswordEncoderPort passwordEncoderPort;
    private final TokenGeneratorPort tokenGeneratorPort;

    @Override
    public LoginResult login(LoginCommand command) {
        User user = loadUserByUsernamePort.loadByUsername(command.username())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid username or password"));

        boolean isValidPassword = passwordEncoderPort.matches(
                command.password(),
                user.getPassword()
        );

        if (!isValidPassword) {
            throw new InvalidCredentialsException("Invalid username or password");
        }

        String token = tokenGeneratorPort.generateToken(user);

        return new LoginResult(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getPosition(),
                token
        );
    }
}
