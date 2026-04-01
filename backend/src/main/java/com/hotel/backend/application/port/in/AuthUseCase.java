package com.hotel.backend.application.port.in;

import com.hotel.backend.adapter.in.web.dto.LoginRequest;
import com.hotel.backend.adapter.in.web.dto.LoginResponse;

public interface AuthUseCase {
    LoginResponse login(LoginRequest request);
}
