package com.hotel.backend.adapter.in.web.auth.dto;

public record LoginResponse(
        String token,
        UserInfo user
) {
    public record UserInfo(
            Integer id,
            String username,
            String fullName,
            String position
    ) {
    }
}
