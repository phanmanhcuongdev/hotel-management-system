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

    public UserEntity mapToJpaEntity(User user) {
        if (user == null) {
            return null;
        }

        UserEntity entity = new UserEntity();
        entity.setId(user.getId());
        entity.setUsername(user.getUsername());
        entity.setPassword(user.getPassword());
        entity.setFullName(user.getFullName());
        entity.setPosition(user.getPosition());
        entity.setMail(user.getMail());
        entity.setDescription(user.getDescription());
        return entity;
    }
}
