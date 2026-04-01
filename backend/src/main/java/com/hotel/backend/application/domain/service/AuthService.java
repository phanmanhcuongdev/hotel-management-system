package com.hotel.backend.application.domain.service;

import com.hotel.backend.adapter.in.web.dto.LoginRequest;
import com.hotel.backend.adapter.in.web.dto.LoginResponse;
import com.hotel.backend.application.port.in.AuthUseCase;
import com.hotel.backend.application.port.out.LoadUserPort;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class AuthService implements AuthUseCase {

    private final LoadUserPort loadUserPort;
    private final PasswordEncoder passwordEncoder;
    private final SecretKey secretKey;
    private final long expirationMs;

    public AuthService(
            LoadUserPort loadUserPort,
            PasswordEncoder passwordEncoder,
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-ms}") long expirationMs) {
        this.loadUserPort = loadUserPort;
        this.passwordEncoder = passwordEncoder;
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        return loadUserPort.loadByUsername(request.getUsername())
                .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> {
                    String token = Jwts.builder()
                            .subject(user.getUsername())
                            .claim("role", user.getRole())
                            .issuedAt(new Date())
                            .expiration(new Date(System.currentTimeMillis() + expirationMs))
                            .signWith(secretKey)
                            .compact();
                    return new LoginResponse(token, user.getUsername(), user.getRole());
                })
                .orElseThrow(() -> new IllegalStateException("Invalid username or password"));
    }
}
