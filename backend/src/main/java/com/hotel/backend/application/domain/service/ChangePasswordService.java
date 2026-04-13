package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.InvalidCredentialsException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.auth.ChangePasswordCommand;
import com.hotel.backend.application.port.in.auth.ChangePasswordUseCase;
import com.hotel.backend.application.port.out.auth.LoadUserByUsernamePort;
import com.hotel.backend.application.port.out.auth.PasswordEncoderPort;
import com.hotel.backend.application.port.out.user.SaveUserPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class ChangePasswordService implements ChangePasswordUseCase {

    private final LoadUserByUsernamePort loadUserByUsernamePort;
    private final PasswordEncoderPort passwordEncoderPort;
    private final SaveUserPort saveUserPort;

    @Override
    public void changePassword(ChangePasswordCommand command) {
        User user = loadUserByUsernamePort.loadByUsername(command.username())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user was not found"));

        if (!passwordEncoderPort.matches(command.currentPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Current password is incorrect");
        }

        if (!command.newPassword().equals(command.confirmPassword())) {
            throw new IllegalArgumentException("Password confirmation does not match");
        }

        if (passwordEncoderPort.matches(command.newPassword(), user.getPassword())) {
            throw new BusinessConflictException("New password must be different from the current password");
        }

        User updatedUser = new User(
                user.getId(),
                user.getUsername(),
                passwordEncoderPort.encode(command.newPassword()),
                user.getFullName(),
                user.getPosition(),
                user.getMail(),
                user.getDescription()
        );

        saveUserPort.saveUser(updatedUser);
    }
}
