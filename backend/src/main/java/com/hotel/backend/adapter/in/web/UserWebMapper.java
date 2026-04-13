package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.UserResponse;
import com.hotel.backend.application.domain.model.User;

public final class UserWebMapper {

    private UserWebMapper() {
    }

    public static UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getPosition(),
                user.getMail(),
                user.getDescription()
        );
    }
}
