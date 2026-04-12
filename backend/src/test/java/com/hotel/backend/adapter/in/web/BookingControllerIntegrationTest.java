package com.hotel.backend.adapter.in.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.CheckInBookingUseCase;
import com.hotel.backend.application.port.in.CheckOutBookingUseCase;
import com.hotel.backend.application.port.in.BookingWithRoom;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.in.UpdateBookingDetailsUseCase;
import com.hotel.backend.application.port.in.UpdateBookingStatusUseCase;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
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
    private UpdateBookingDetailsUseCase updateBookingDetailsUseCase;

    @MockitoBean
    private CheckInBookingUseCase checkInBookingUseCase;

    @MockitoBean
    private CheckOutBookingUseCase checkOutBookingUseCase;

    @MockitoBean
    private LoadBookedRoomPort loadBookedRoomPort;

    @MockitoBean
    private JwtTokenProvider jwtTokenProvider;

    @MockitoBean
    private LoadAuthenticatedUserUseCase loadAuthenticatedUserUseCase;

    @Test
    void getBookingsReturnsBookingList() throws Exception {
        when(getBookingsUseCase.getAll(any())).thenReturn(List.of(
                new BookingWithRoom(
                        new com.hotel.backend.application.domain.model.Booking(
                                1L,
                                "Alice",
                                "0123456789",
                                "alice@example.com",
                                101L,
                                LocalDate.of(2026, 4, 20),
                                LocalDate.of(2026, 4, 22),
                                com.hotel.backend.application.domain.model.BookingStatus.CONFIRMED,
                                LocalDateTime.of(2026, 4, 10, 9, 0),
                                LocalDateTime.of(2026, 4, 10, 9, 0),
                                5,
                                BigDecimal.TEN,
                                "Late arrival",
                                1,
                                "admin",
                                "Admin User"
                        ),
                        new com.hotel.backend.application.domain.model.Room(
                                101L,
                                "101",
                                com.hotel.backend.application.domain.model.RoomStatus.AVAILABLE,
                                new com.hotel.backend.application.domain.model.RoomType(1L, "Standard", null, BigDecimal.valueOf(100), 2)
                        )
                )
        ));
        when(loadBookedRoomPort.loadByBookingId(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/bookings")
                        .with(user("admin").roles("ADMIN")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].guestName").value("Alice"))
                .andExpect(jsonPath("$[0].clientId").value(5))
                .andExpect(jsonPath("$[0].discount").value(10))
                .andExpect(jsonPath("$[0].bookedBy.username").value("admin"))
                .andExpect(jsonPath("$[0].room.roomNumber").value("101"));
    }

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
            String discount,
            String note,
            Long roomId,
            String checkIn,
            String checkOut
    ) {
        private CreateBookingBody() {
            this("Alice", "0123456789", "alice@example.com", "0", null, 101L, "2026-04-20", "2026-04-22");
        }
    }
}
