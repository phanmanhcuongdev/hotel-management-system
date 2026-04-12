package com.hotel.backend.adapter.in.web.auth;

import com.hotel.backend.adapter.in.web.auth.dto.LoginRequest;
import com.hotel.backend.adapter.in.web.auth.dto.LoginResponse;
import com.hotel.backend.adapter.in.web.auth.dto.ChangePasswordRequest;
import com.hotel.backend.application.domain.exception.InvalidCredentialsException;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.auth.ChangePasswordCommand;
import com.hotel.backend.application.port.in.auth.ChangePasswordUseCase;
import com.hotel.backend.application.port.in.auth.LoadAuthenticatedUserUseCase;
import com.hotel.backend.application.port.in.auth.LoginCommand;
import com.hotel.backend.application.port.in.auth.LoginResult;
import com.hotel.backend.application.port.in.auth.LoginUseCase;
import com.hotel.backend.application.port.in.auth.LogoutUseCase;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@WebAdapter
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final LoginUseCase loginUseCase;
    private final LoadAuthenticatedUserUseCase loadAuthenticatedUserUseCase;
    private final LogoutUseCase logoutUseCase;
    private final ChangePasswordUseCase changePasswordUseCase;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        LoginCommand command = new LoginCommand(request.getUsername(), request.getPassword());
        LoginResult result = loginUseCase.login(command);

        return new LoginResponse(
                result.token(),
                new LoginResponse.UserInfo(
                        result.id(),
                        result.username(),
                        result.fullName(),
                        result.position()
                )
        );
    }

    @GetMapping("/me")
    public LoginResponse.UserInfo me(Authentication authentication) {
        User user = loadAuthenticatedUserUseCase.loadAuthenticatedUser(authentication.getName())
                .orElseThrow(() -> new InvalidCredentialsException("Authenticated user not found"));

        return new LoginResponse.UserInfo(
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getPosition()
        );
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(Authentication authentication) {
        logoutUseCase.logout(authentication.getName());
    }

    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changePassword(@RequestBody @Valid ChangePasswordRequest request, Authentication authentication) {
        changePasswordUseCase.changePassword(new ChangePasswordCommand(
                authentication.getName(),
                request.getCurrentPassword(),
                request.getNewPassword(),
                request.getConfirmPassword()
        ));
    }
}
