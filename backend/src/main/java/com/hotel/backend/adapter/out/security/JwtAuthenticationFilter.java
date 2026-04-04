package com.hotel.backend.adapter.out.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotel.backend.adapter.in.web.dto.ApiErrorResponse;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.auth.LoadAuthenticatedUserUseCase;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String PUBLIC_LOGIN_PATH = "/api/auth/login";

    private final JwtTokenProvider jwtTokenProvider;
    private final LoadAuthenticatedUserUseCase loadAuthenticatedUserUseCase;
    private final ObjectMapper objectMapper;

    public JwtAuthenticationFilter(
            JwtTokenProvider jwtTokenProvider,
            LoadAuthenticatedUserUseCase loadAuthenticatedUserUseCase,
            ObjectMapper objectMapper
    ) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.loadAuthenticatedUserUseCase = loadAuthenticatedUserUseCase;
        this.objectMapper = objectMapper;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return "POST".equalsIgnoreCase(request.getMethod())
                && PUBLIC_LOGIN_PATH.equals(request.getRequestURI());
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            if (!jwtTokenProvider.validateToken(token)) {
                writeUnauthorized(response, "INVALID_TOKEN", "Bearer token is invalid or expired");
                return;
            }

            String username = jwtTokenProvider.getUsernameFromToken(token);
            User user = loadAuthenticatedUserUseCase.loadAuthenticatedUser(username).orElse(null);

            if (user == null) {
                writeUnauthorized(response, "INVALID_TOKEN", "Authenticated user no longer exists");
                return;
            }

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            null,
                            buildAuthorities(user)
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private List<SimpleGrantedAuthority> buildAuthorities(User user) {
        if (!StringUtils.hasText(user.getPosition())) {
            return List.of();
        }

        String role = "ROLE_" + user.getPosition()
                .trim()
                .replaceAll("[^A-Za-z0-9]+", "_")
                .toUpperCase();

        return List.of(new SimpleGrantedAuthority(role));
    }

    private void writeUnauthorized(HttpServletResponse response, String error, String message) throws IOException {
        SecurityContextHolder.clearContext();
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        objectMapper.writeValue(response.getWriter(), new ApiErrorResponse(error, message));
    }
}
