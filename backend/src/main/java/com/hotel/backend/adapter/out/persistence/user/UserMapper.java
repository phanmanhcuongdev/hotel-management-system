package com.hotel.backend.adapter.out.persistence.user;

import com.hotel.backend.application.domain.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User mapToDomainEntity(UserEntity userEntity) {
        if (userEntity == null) {
            return null;
        }

        return new User(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.getFullName(),
                userEntity.getPosition(),
                userEntity.getMail(),
                userEntity.getDescription()
        );
    }
}