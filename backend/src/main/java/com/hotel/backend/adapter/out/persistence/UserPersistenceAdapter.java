package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.out.LoadUserPort;

import java.util.Optional;

public class UserPersistenceAdapter implements LoadUserPort {

    private final SpringDataUserRepository userRepo;

    public UserPersistenceAdapter(SpringDataUserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public Optional<User> loadByUsername(String username) {
        return userRepo.findByUsername(username).map(UserMapper::toDomain);
    }
}
