package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.user.CreateUserCommand;
import com.hotel.backend.application.port.in.user.ManageUserUseCase;
import com.hotel.backend.application.port.in.user.UpdateUserCommand;
import com.hotel.backend.application.port.out.auth.PasswordEncoderPort;
import com.hotel.backend.application.port.out.user.DeleteUserPort;
import com.hotel.backend.application.port.out.user.LoadUserPort;
import com.hotel.backend.application.port.out.user.SaveUserPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@UseCase
@RequiredArgsConstructor
public class UserManagementService implements ManageUserUseCase {

    private static final Set<String> SUPPORTED_POSITIONS = Set.of("ADMIN");

    private final LoadUserPort loadUserPort;
    private final SaveUserPort saveUserPort;
    private final DeleteUserPort deleteUserPort;
    private final PasswordEncoderPort passwordEncoderPort;

    @Override
    public User createUser(CreateUserCommand command) {
        String normalizedUsername = normalizeRequired(command.username(), "username");
        if (loadUserPort.existsByUsername(normalizedUsername)) {
            throw new BusinessConflictException("Username already exists");
        }

        String normalizedPosition = normalizePosition(command.position());
        User user = new User(
                null,
                normalizedUsername,
                passwordEncoderPort.encode(command.password().trim()),
                normalizeRequired(command.fullName(), "fullName"),
                normalizedPosition,
                normalizeOptional(command.mail()),
                normalizeOptional(command.description())
        );

        return saveUserPort.saveUser(user);
    }

    @Override
    public User updateUser(UpdateUserCommand command) {
        User existingUser = loadUserPort.loadUserById(command.id())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String normalizedUsername = normalizeRequired(command.username(), "username");
        if (loadUserPort.existsByUsernameAndIdNot(normalizedUsername, command.id())) {
            throw new BusinessConflictException("Username already exists");
        }

        User updatedUser = new User(
                existingUser.getId(),
                normalizedUsername,
                existingUser.getPassword(),
                normalizeRequired(command.fullName(), "fullName"),
                normalizePosition(command.position()),
                normalizeOptional(command.mail()),
                normalizeOptional(command.description())
        );

        return saveUserPort.saveUser(updatedUser);
    }

    @Override
    public void deleteUser(Integer id, String actorUsername) {
        User user = loadUserPort.loadUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getUsername().equalsIgnoreCase(actorUsername)) {
            throw new BusinessConflictException("You cannot delete the account currently signed in");
        }

        if (deleteUserPort.hasRelatedOperationalData(id)) {
            throw new BusinessConflictException("User cannot be deleted because related booking or bill records still exist");
        }

        deleteUserPort.deleteUserById(id);
    }

    private String normalizeRequired(String value, String fieldName) {
        String normalized = value == null ? "" : value.trim();
        if (normalized.isBlank()) {
            throw new IllegalArgumentException(fieldName + " is required");
        }
        return normalized;
    }

    private String normalizeOptional(String value) {
        if (value == null) {
            return null;
        }

        String normalized = value.trim();
        return normalized.isBlank() ? null : normalized;
    }

    private String normalizePosition(String position) {
        String normalized = normalizeRequired(position, "position").toUpperCase();
        if (!SUPPORTED_POSITIONS.contains(normalized)) {
            throw new IllegalArgumentException("position is not supported");
        }
        return normalized;
    }
}
