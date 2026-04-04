package com.hotel.backend.adapter.in.web.auth;

import com.hotel.backend.adapter.in.web.auth.dto.LoginRequest;
import com.hotel.backend.adapter.in.web.auth.dto.LoginResponse;
import com.hotel.backend.application.port.in.auth.LoginCommand;
import com.hotel.backend.application.port.in.auth.LoginResult;
import com.hotel.backend.application.port.in.auth.LoginUseCase;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@WebAdapter
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LoginUseCase loginUseCase;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        LoginCommand command = new LoginCommand(
                request.getUsername(),
                request.getPassword()
        );

        LoginResult result = loginUseCase.login(command);

        return new LoginResponse(
                result.id(),
                result.username(),
                result.fullName(),
                result.position(),
                result.token()
        );
    }
}
