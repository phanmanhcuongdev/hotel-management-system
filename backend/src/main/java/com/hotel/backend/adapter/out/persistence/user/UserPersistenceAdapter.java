package com.hotel.backend.adapter.out.persistence.user;

import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.out.auth.LoadUserByUsernamePort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class UserPersistenceAdapter implements LoadUserByUsernamePort {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public Optional<User> loadByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::mapToDomainEntity);
    }
}