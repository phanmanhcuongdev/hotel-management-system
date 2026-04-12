package com.hotel.backend.application.domain.model;

public class User {

    private Integer id;
    private String username;
    private String password;
    private String fullName;
    private String position;
    private String mail;
    private String description;

    public User(Integer id, String username, String password, String fullName, String position, String mail, String description) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.position = position;
        this.mail = mail;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPosition() {
        return position;
    }

    public String getMail() {
        return mail;
    }

    public String getDescription() {
        return description;
    }
}
