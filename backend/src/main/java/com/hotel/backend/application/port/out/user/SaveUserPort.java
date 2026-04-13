package com.hotel.backend.application.port.out.user;

import com.hotel.backend.application.domain.model.User;

public interface SaveUserPort {
    User saveUser(User user);
}
