package com.hotel.backend.config;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Validated
@Data
public class JwtConfig {
    @NotBlank(message = "JWT secret must not be blank")
    @Size(min = 32, message = "JWT secret must be at least 32 characters long")
    private String secret;

    @Min(value = 1, message = "JWT expiration must be greater than zero")
    private long expirationMs;
}
