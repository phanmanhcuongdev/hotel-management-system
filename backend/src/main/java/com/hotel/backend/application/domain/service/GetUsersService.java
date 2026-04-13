package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.user.GetUsersQuery;
import com.hotel.backend.application.port.in.user.GetUsersUseCase;
import com.hotel.backend.application.port.out.user.LoadUserPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetUsersService implements GetUsersUseCase {

    private final LoadUserPort loadUserPort;

    @Override
    public List<User> getUsers(GetUsersQuery query) {
        return loadUserPort.loadUsers(query);
    }

    @Override
    public User getUserById(Integer id) {
        return loadUserPort.loadUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
