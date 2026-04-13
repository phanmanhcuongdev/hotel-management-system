package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.model.BookedRoom;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookedRoomPort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CheckInBookingServiceTest {

    @Mock
    private LoadBookingPort loadBookingPort;

    @Mock
    private LoadBookedRoomPort loadBookedRoomPort;

    @Mock
    private LoadRoomPort loadRoomPort;

    @Mock
    private SaveBookedRoomPort saveBookedRoomPort;

    @Mock
    private SaveRoomPort saveRoomPort;

    @InjectMocks
    private CheckInBookingService checkInBookingService;

    @Test
    void checkInRequiresConfirmedBooking() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking(BookingStatus.PENDING)));

        assertThatThrownBy(() -> checkInBookingService.checkIn(1L))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Only confirmed bookings can be checked in");

        verify(saveBookedRoomPort, never()).save(any());
    }

    @Test
    void checkInMarksBookedRoomAndRoomOccupied() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking(BookingStatus.CONFIRMED)));
        when(loadBookedRoomPort.loadByBookingId(1L)).thenReturn(Optional.empty());
        when(loadRoomPort.loadRoomById(101L)).thenReturn(Optional.of(room(RoomStatus.AVAILABLE)));

        checkInBookingService.checkIn(1L);

        verify(saveBookedRoomPort).save(new BookedRoom(null, 1L, 101L, LocalDate.now(), LocalDate.now().plusDays(2), true));
        verify(saveRoomPort).saveRoom(new Room(101L, "101", RoomStatus.OCCUPIED, room(RoomStatus.AVAILABLE).type()));
    }

    private Booking booking(BookingStatus status) {
        return new Booking(
                1L,
                "Alice",
                "0123456789",
                "alice@example.com",
                101L,
                LocalDate.now(),
                LocalDate.now().plusDays(2),
                status,
                LocalDateTime.now(),
                LocalDateTime.now(),
                null,
                BigDecimal.ZERO,
                null,
                null,
                null,
                null
        );
    }

    private Room room(RoomStatus status) {
        return new Room(101L, "101", status, new RoomType(1L, "Standard", null, BigDecimal.valueOf(100), 2));
    }
}
