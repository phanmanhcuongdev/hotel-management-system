package com.hotel.backend.application.port.in.user;

import com.hotel.backend.application.domain.model.User;

import java.util.List;

public interface GetUsersUseCase {
    List<User> getUsers(GetUsersQuery query);

    User getUserById(Integer id);
}
