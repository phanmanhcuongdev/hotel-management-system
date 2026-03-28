package com.hotel.backend.adapter.in.web.auth;

import com.hotel.backend.adapter.in.web.auth.dto.*;
import com.hotel.backend.application.port.in.auth.LoginCommand;
import com.hotel.backend.application.port.in.auth.LoginResult;
import com.hotel.backend.application.port.in.auth.LoginUseCase;
import com.hotel.backend.config.WebAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@WebAdapter
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LoginUseCase loginUseCase;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        // map request → command
        LoginCommand command = new LoginCommand(
                request.getUsername(),
                request.getPassword()
        );

        // gọi use case
        LoginResult result = loginUseCase.login(command);

        // map result → response
        return new LoginResponse(
                result.id(),
                result.username(),
                result.fullName(),
                result.position(),
                result.token()
        );
    }
}