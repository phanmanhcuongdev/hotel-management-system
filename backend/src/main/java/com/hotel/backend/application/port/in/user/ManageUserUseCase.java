package com.hotel.backend.application.port.in.user;

import com.hotel.backend.application.domain.model.User;

public interface ManageUserUseCase {
    User createUser(CreateUserCommand command);

    User updateUser(UpdateUserCommand command);

    void deleteUser(Integer id, String actorUsername);
}
