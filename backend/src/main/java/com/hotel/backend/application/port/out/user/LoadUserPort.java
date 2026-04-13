package com.hotel.backend.application.port.out.user;

import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.user.GetUsersQuery;

import java.util.List;
import java.util.Optional;

public interface LoadUserPort {
    Optional<User> loadUserById(Integer id);

    List<User> loadUsers(GetUsersQuery query);

    boolean existsByUsername(String username);

    boolean existsByUsernameAndIdNot(String username, Integer id);
}
