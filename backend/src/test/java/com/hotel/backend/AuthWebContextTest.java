package com.hotel.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotel.backend.adapter.in.web.GlobalExceptionHandler;
import com.hotel.backend.adapter.in.web.auth.AuthController;
import com.hotel.backend.adapter.out.security.JwtAuthenticationFilter;
import com.hotel.backend.adapter.out.security.JwtTokenProvider;
import com.hotel.backend.application.port.in.auth.LoadAuthenticatedUserUseCase;
import com.hotel.backend.application.port.in.auth.LoginUseCase;
import com.hotel.backend.config.ObjectMapperConfig;
import com.hotel.backend.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;

@WebMvcTest({AuthController.class, GlobalExceptionHandler.class, JwtAuthenticationFilter.class, SecurityConfig.class})
@Import({ObjectMapperConfig.class, GlobalExceptionHandler.class})
class AuthWebContextTest {

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
    void webContextLoads() {
        assertThat(mockMvc).isNotNull();
        assertThat(objectMapper).isNotNull();
    }
}
