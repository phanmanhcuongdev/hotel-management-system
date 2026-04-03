package com.hotel.backend.adapter.in.web.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotel.backend.adapter.in.web.GlobalExceptionHandler;
import com.hotel.backend.adapter.out.security.JwtAuthenticationFilter;
import com.hotel.backend.adapter.out.security.JwtTokenProvider;
import com.hotel.backend.application.domain.exception.InvalidCredentialsException;
import com.hotel.backend.application.port.in.auth.LoadAuthenticatedUserUseCase;
import com.hotel.backend.application.port.in.auth.LoginResult;
import com.hotel.backend.application.port.in.auth.LoginUseCase;
import com.hotel.backend.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.http.MediaType;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({AuthController.class, GlobalExceptionHandler.class, JwtAuthenticationFilter.class, SecurityConfig.class})
@Import({GlobalExceptionHandler.class, AuthControllerTest.TestConfig.class})
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private LoginUseCase loginUseCase;

    @MockitoBean
    private JwtTokenProvider jwtTokenProvider;

    @MockitoBean
    private LoadAuthenticatedUserUseCase loadAuthenticatedUserUseCase;

    @Test
    void loginSuccessReturnsBackwardCompatibleResponse() throws Exception {
        LoginResult result = new LoginResult(1, "admin", "Admin User", "MANAGER", "jwt-token");
        when(loginUseCase.login(any())).thenReturn(result);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new TestLoginRequest("admin", "secret"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("admin"))
                .andExpect(jsonPath("$.fullName").value("Admin User"))
                .andExpect(jsonPath("$.position").value("MANAGER"))
                .andExpect(jsonPath("$.token").value("jwt-token"));
    }

    @Test
    void loginFailureReturnsUnauthorized() throws Exception {
        when(loginUseCase.login(any())).thenThrow(new InvalidCredentialsException("Invalid username or password"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new TestLoginRequest("admin", "wrong"))))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("INVALID_CREDENTIALS"))
                .andExpect(jsonPath("$.message").value("Invalid username or password"))
                .andExpect(jsonPath("$.details").isArray());
    }

    @Test
    void loginValidationFailureReturnsBadRequest() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new TestLoginRequest("", ""))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details[0].field").exists());
    }

    @Test
    void invalidTokenReturnsUnauthorizedJson() throws Exception {
        when(jwtTokenProvider.validateToken("bad-token")).thenReturn(false);

        mockMvc.perform(get("/api/test/protected")
                        .header("Authorization", "Bearer bad-token"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("INVALID_TOKEN"))
                .andExpect(jsonPath("$.message").value("Bearer token is invalid or expired"));
    }

    @Test
    void invalidTokenDoesNotBlockPublicLoginEndpoint() throws Exception {
        LoginResult result = new LoginResult(1, "admin", "Admin User", "MANAGER", "jwt-token");
        when(loginUseCase.login(any())).thenReturn(result);

        mockMvc.perform(post("/api/auth/login")
                        .header("Authorization", "Bearer bad-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new TestLoginRequest("admin", "secret"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("jwt-token"));
    }

    @Test
    void deletedUserFromTokenReturnsUnauthorized() throws Exception {
        when(jwtTokenProvider.validateToken("deleted-user-token")).thenReturn(true);
        when(jwtTokenProvider.getUsernameFromToken("deleted-user-token")).thenReturn("ghost");
        when(loadAuthenticatedUserUseCase.loadAuthenticatedUser("ghost")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/test/protected")
                        .header("Authorization", "Bearer deleted-user-token"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("INVALID_TOKEN"))
                .andExpect(jsonPath("$.message").value("Authenticated user no longer exists"));
    }

    private record TestLoginRequest(String username, String password) {
    }

    @TestConfiguration
    static class TestConfig {
        @Bean
        ObjectMapper objectMapper() {
            return new ObjectMapper();
        }
    }
}
