package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.application.port.out.SaveRoomPort;
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
    private SaveBookingPort saveBookingPort;

    @Mock
    private SaveRoomPort saveRoomPort;

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
                LocalDate.of(2026, 4, 22)
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
        verify(saveRoomPort, never()).saveRoom(any());
    }

    @Test
    void createSucceedsForValidBookingAndMarksRoomOccupied() {
        CreateBookingCommand command = new CreateBookingCommand(
                "Bob",
                "0987654321",
                "bob@example.com",
                101L,
                LocalDate.of(2026, 4, 25),
                LocalDate.of(2026, 4, 27)
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
                LocalDateTime.now()
        );

        when(loadRoomPort.loadRoomById(101L)).thenReturn(Optional.of(room));
        when(loadBookingsPort.existsActiveOverlap(
                101L,
                command.checkIn(),
                command.checkOut(),
                List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED)
        )).thenReturn(false);
        when(saveBookingPort.save(any())).thenReturn(savedBooking);

        Booking result = createBookingService.create(command);

        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.status()).isEqualTo(BookingStatus.PENDING);
        verify(saveBookingPort).save(any());
        verify(saveRoomPort).saveRoom(new Room(room.id(), room.roomNumber(), RoomStatus.OCCUPIED, room.type()));
    }

    private Room sampleRoom(RoomStatus status) {
        return new Room(
                101L,
                "101",
                status,
                new RoomType(1L, "Standard", BigDecimal.valueOf(100), 2)
        );
    }
}
