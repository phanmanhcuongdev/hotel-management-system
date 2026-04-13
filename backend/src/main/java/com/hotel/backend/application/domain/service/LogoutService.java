package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.port.in.auth.LogoutUseCase;
import com.hotel.backend.config.UseCase;

@UseCase
public class LogoutService implements LogoutUseCase {

    @Override
    public void logout(String username) {
        // Stateless JWT logout is acknowledged at the API layer only.
        // The client must discard the stored token after this request completes.
    }
}
