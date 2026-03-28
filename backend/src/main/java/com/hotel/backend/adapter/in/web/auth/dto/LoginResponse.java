package com.hotel.backend.adapter.in.web.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private Integer id;
    private String username;
    private String fullName;
    private String position;
    private String token;
}