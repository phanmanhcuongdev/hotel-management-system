package com.hotel.backend.application.port.out.user;

public interface DeleteUserPort {
    void deleteUserById(Integer id);

    boolean hasRelatedOperationalData(Integer id);
}
