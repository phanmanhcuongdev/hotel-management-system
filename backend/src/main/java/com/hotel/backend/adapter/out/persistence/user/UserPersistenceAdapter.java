package com.hotel.backend.adapter.out.persistence.user;

import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.out.auth.LoadUserByUsernamePort;
import com.hotel.backend.application.port.in.user.GetUsersQuery;
import com.hotel.backend.application.port.out.user.DeleteUserPort;
import com.hotel.backend.application.port.out.user.LoadUserPort;
import com.hotel.backend.application.port.out.user.SaveUserPort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class UserPersistenceAdapter implements LoadUserByUsernamePort, LoadUserPort, SaveUserPort, DeleteUserPort {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public Optional<User> loadByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::mapToDomainEntity);
    }

    @Override
    public Optional<User> loadUserById(Integer id) {
        return userRepository.findById(id)
                .map(userMapper::mapToDomainEntity);
    }

    @Override
    public List<User> loadUsers(GetUsersQuery query) {
        return userRepository.search(query.keyword().orElse(null)).stream()
                .map(userMapper::mapToDomainEntity)
                .toList();
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByUsernameAndIdNot(String username, Integer id) {
        return userRepository.existsByUsernameAndIdNot(username, id);
    }

    @Override
    public User saveUser(User user) {
        return userMapper.mapToDomainEntity(userRepository.save(userMapper.mapToJpaEntity(user)));
    }

    @Override
    public void deleteUserById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean hasRelatedOperationalData(Integer id) {
        return userRepository.hasRelatedOperationalData(id);
    }
}
