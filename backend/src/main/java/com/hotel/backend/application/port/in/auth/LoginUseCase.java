package com.hotel.backend.application.port.in.auth;

public interface LoginUseCase {
    LoginResult login(LoginCommand command);
}
