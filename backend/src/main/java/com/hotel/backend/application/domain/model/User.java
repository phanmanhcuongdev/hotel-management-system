package com.hotel.backend.application.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {

    private Integer id;
    private String username;
    private String password;
    private String fullName;
    private String position;
    private String mail;
    private String description;
}