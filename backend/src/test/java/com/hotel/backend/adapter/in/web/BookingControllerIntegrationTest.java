package com.hotel.backend.adapter.in.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.in.UpdateBookingStatusUseCase;
import com.hotel.backend.adapter.out.security.JwtAuthenticationFilter;
import com.hotel.backend.adapter.out.security.JwtTokenProvider;
import com.hotel.backend.application.port.in.auth.LoadAuthenticatedUserUseCase;
import com.hotel.backend.config.ObjectMapperConfig;
import com.hotel.backend.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;

@WebMvcTest({BookingController.class, GlobalExceptionHandler.class, JwtAuthenticationFilter.class, SecurityConfig.class})
@Import({GlobalExceptionHandler.class, ObjectMapperConfig.class})
class BookingControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private CreateBookingUseCase createBookingUseCase;

    @MockitoBean
    private GetBookingUseCase getBookingUseCase;

    @MockitoBean
    private GetBookingsUseCase getBookingsUseCase;

    @MockitoBean
    private UpdateBookingStatusUseCase updateBookingStatusUseCase;

    @MockitoBean
    private JwtTokenProvider jwtTokenProvider;

    @MockitoBean
    private LoadAuthenticatedUserUseCase loadAuthenticatedUserUseCase;

    @Test
    void postBookingsOverlapReturnsConflict() throws Exception {
        when(createBookingUseCase.create(any()))
                .thenThrow(new BusinessConflictException("Room already has an active booking in the requested date range"));

        mockMvc.perform(post("/api/bookings")
                        .with(user("admin").roles("ADMIN"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CreateBookingBody())))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error").value("BUSINESS_CONFLICT"))
                .andExpect(jsonPath("$.message").value("Room already has an active booking in the requested date range"));
    }

    @Test
    void getBookingNotFoundReturns404() throws Exception {
        when(getBookingUseCase.getById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/bookings/999")
                        .with(user("admin").roles("ADMIN")))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("NOT_FOUND"))
                .andExpect(jsonPath("$.message").value("Booking not found"));
    }

    @Test
    void nonAdminMutationReturnsForbidden() throws Exception {
        mockMvc.perform(patch("/api/bookings/1/status")
                        .with(user("staff").roles("STAFF"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"status":"CANCELLED"}
                                """))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error").value("FORBIDDEN"))
                .andExpect(jsonPath("$.message").value("Access is denied"));

        verify(updateBookingStatusUseCase, never()).updateStatus(any(), any());
    }

    private record CreateBookingBody(
            String guestName,
            String phoneNumber,
            String email,
            Long roomId,
            String checkIn,
            String checkOut
    ) {
        private CreateBookingBody() {
            this("Alice", "0123456789", "alice@example.com", 101L, "2026-04-20", "2026-04-22");
        }
    }
}
