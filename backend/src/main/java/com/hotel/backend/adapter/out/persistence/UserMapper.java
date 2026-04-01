package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.User;

public class UserMapper {

    public static User toDomain(UserJpaEntity entity) {
        return new User(
                entity.id,
                entity.username,
                entity.password,
                entity.role
        );
    }
}
