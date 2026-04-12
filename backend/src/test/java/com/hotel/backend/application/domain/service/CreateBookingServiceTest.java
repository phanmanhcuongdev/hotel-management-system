package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Client;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadClientPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.application.port.out.SaveClientPort;
import com.hotel.backend.application.port.out.auth.LoadUserByUsernamePort;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateBookingServiceTest {

    @Mock
    private LoadRoomPort loadRoomPort;

    @Mock
    private LoadBookingsPort loadBookingsPort;

    @Mock
    private LoadClientPort loadClientPort;

    @Mock
    private SaveClientPort saveClientPort;

    @Mock
    private SaveBookingPort saveBookingPort;

    @Mock
    private LoadUserByUsernamePort loadUserByUsernamePort;

    @InjectMocks
    private CreateBookingService createBookingService;

    @Test
    void createThrowsConflictWhenActiveBookingOverlapExists() {
        CreateBookingCommand command = new CreateBookingCommand(
                "Alice",
                "0123456789",
                "alice@example.com",
                101L,
                LocalDate.of(2026, 4, 20),
                LocalDate.of(2026, 4, 22),
                BigDecimal.ZERO,
                null,
                "admin"
        );

        when(loadRoomPort.loadRoomById(101L)).thenReturn(Optional.of(sampleRoom(RoomStatus.AVAILABLE)));
        when(loadBookingsPort.existsActiveOverlap(
                101L,
                command.checkIn(),
                command.checkOut(),
                List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED)
        )).thenReturn(true);

        assertThatThrownBy(() -> createBookingService.create(command))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Room already has an active booking in the requested date range");

        verify(saveBookingPort, never()).save(any());
        verify(saveBookingPort, never()).save(any(), any());
    }

    @Test
    void createSucceedsForValidBookingWithoutChangingRoomStatus() {
        CreateBookingCommand command = new CreateBookingCommand(
                "Bob",
                "0987 654 321",
                "bob@example.com",
                101L,
                LocalDate.of(2026, 4, 25),
                LocalDate.of(2026, 4, 27),
                BigDecimal.valueOf(15),
                "Loyalty adjustment",
                "admin"
        );

        Room room = sampleRoom(RoomStatus.AVAILABLE);
        Booking savedBooking = new Booking(
                1L,
                command.guestName(),
                command.phoneNumber(),
                command.email(),
                command.roomId(),
                command.checkIn(),
                command.checkOut(),
                BookingStatus.PENDING,
                LocalDateTime.now(),
                LocalDateTime.now(),
                7,
                BigDecimal.valueOf(15),
                "Loyalty adjustment",
                1,
                "admin",
                "Admin User"
        );

        when(loadRoomPort.loadRoomById(101L)).thenReturn(Optional.of(room));
        when(loadBookingsPort.existsActiveOverlap(
                101L,
                command.checkIn(),
                command.checkOut(),
                List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED)
        )).thenReturn(false);
        when(loadClientPort.loadByNormalizedPhone("0987654321")).thenReturn(Optional.of(new Client(
                7,
                "ID-7",
                "Bob",
                "Main address",
                "bob@example.com",
                "0987654321",
                null,
                false
        )));
        when(loadUserByUsernamePort.loadByUsername("admin")).thenReturn(Optional.of(new com.hotel.backend.application.domain.model.User(
                1,
                "admin",
                "",
                "Admin User",
                "ADMIN",
                null,
                null
        )));
        when(saveBookingPort.save(any(), eq(7))).thenReturn(savedBooking);

        Booking result = createBookingService.create(command);

        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.status()).isEqualTo(BookingStatus.PENDING);
        assertThat(result.discount()).isEqualByComparingTo("15");
        verify(saveBookingPort).save(any(), eq(7));
    }

    @Test
    void createCreatesClientWhenPhoneNotFound() {
        CreateBookingCommand command = new CreateBookingCommand(
                "Carol",
                "+84 (912) 345-678",
                "carol@example.com",
                101L,
                LocalDate.of(2026, 4, 28),
                LocalDate.of(2026, 4, 30),
                BigDecimal.ZERO,
                "VIP arrival",
                "admin"
        );

        Booking savedBooking = new Booking(
                2L,
                command.guestName(),
                "84912345678",
                "carol@example.com",
                command.roomId(),
                command.checkIn(),
                command.checkOut(),
                BookingStatus.PENDING,
                LocalDateTime.now(),
                LocalDateTime.now(),
                9,
                BigDecimal.ZERO,
                "VIP arrival",
                1,
                "admin",
                "Admin User"
        );

        when(loadRoomPort.loadRoomById(101L)).thenReturn(Optional.of(sampleRoom(RoomStatus.AVAILABLE)));
        when(loadBookingsPort.existsActiveOverlap(
                101L,
                command.checkIn(),
                command.checkOut(),
                List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED)
        )).thenReturn(false);
        when(loadClientPort.loadByNormalizedPhone("84912345678")).thenReturn(Optional.empty());
        when(saveClientPort.saveAutoCreatedClient("Carol", "84912345678", "carol@example.com")).thenReturn(new Client(
                9,
                "AUTO-PHONE-84912345678",
                "Carol",
                "UNKNOWN",
                "carol@example.com",
                "84912345678",
                "Auto-created from booking flow. Needs profile review.",
                true
        ));
        when(loadUserByUsernamePort.loadByUsername("admin")).thenReturn(Optional.of(new com.hotel.backend.application.domain.model.User(
                1,
                "admin",
                "",
                "Admin User",
                "ADMIN",
                null,
                null
        )));
        when(saveBookingPort.save(any(), eq(9))).thenReturn(savedBooking);

        Booking result = createBookingService.create(command);

        assertThat(result.id()).isEqualTo(2L);
        verify(saveClientPort).saveAutoCreatedClient("Carol", "84912345678", "carol@example.com");
        verify(saveBookingPort).save(any(), eq(9));
    }

    private Room sampleRoom(RoomStatus status) {
        return new Room(
                101L,
                "101",
                status,
                new RoomType(1L, "Standard", null, BigDecimal.valueOf(100), 2)
        );
    }
}
