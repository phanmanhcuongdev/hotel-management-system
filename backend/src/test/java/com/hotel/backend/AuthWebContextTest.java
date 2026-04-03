package com.hotel.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotel.backend.adapter.out.security.JwtTokenProvider;
import com.hotel.backend.application.port.in.auth.LoadAuthenticatedUserUseCase;
import com.hotel.backend.application.port.in.auth.LoginUseCase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;

@WebMvcTest
@Import(AuthWebContextTest.TestConfig.class)
class AuthWebContextTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private LoginUseCase loginUseCase;

    @MockitoBean
    private JwtTokenProvider jwtTokenProvider;

    @MockitoBean
    private LoadAuthenticatedUserUseCase loadAuthenticatedUserUseCase;

    @Test
    void webContextLoads() {
        assertThat(mockMvc).isNotNull();
    }

    @TestConfiguration
    static class TestConfig {
        @Bean
        ObjectMapper objectMapper() {
            return new ObjectMapper();
        }
    }
}
