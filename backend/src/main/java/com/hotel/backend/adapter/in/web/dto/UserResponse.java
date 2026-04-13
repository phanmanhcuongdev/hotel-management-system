package com.hotel.backend.adapter.in.web.dto;

public record UserResponse(
        Integer id,
        String username,
        String fullName,
        String position,
        String mail,
        String description
) {
}
