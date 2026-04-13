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
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CheckOutBookingServiceTest {

    @Mock
    private LoadBookingPort loadBookingPort;

    @Mock
    private LoadBookedRoomPort loadBookedRoomPort;

    @Mock
    private LoadRoomPort loadRoomPort;

    @Mock
    private SaveBookedRoomPort saveBookedRoomPort;

    @Mock
    private SaveBookingPort saveBookingPort;

    @Mock
    private SaveRoomPort saveRoomPort;

    @InjectMocks
    private CheckOutBookingService checkOutBookingService;

    @Test
    void checkoutRequiresCheckedInBooking() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking()));
        when(loadBookedRoomPort.loadByBookingId(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> checkOutBookingService.checkOut(1L))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Booking has not been checked in yet");
    }

    @Test
    void checkoutCompletesBookingAndReleasesRoom() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking()));
        when(loadBookedRoomPort.loadByBookingId(1L)).thenReturn(Optional.of(
                new BookedRoom(5, 1L, 101L, LocalDate.now().minusDays(1), LocalDate.now().plusDays(1), true)
        ));
        when(saveBookingPort.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(loadRoomPort.loadRoomById(101L)).thenReturn(Optional.of(room(RoomStatus.OCCUPIED)));

        checkOutBookingService.checkOut(1L);

        verify(saveBookedRoomPort).save(new BookedRoom(5, 1L, 101L, LocalDate.now().minusDays(1), LocalDate.now().plusDays(1), false));
        verify(saveRoomPort).saveRoom(new Room(101L, "101", RoomStatus.AVAILABLE, room(RoomStatus.OCCUPIED).type()));
    }

    private Booking booking() {
        return new Booking(
                1L,
                "Alice",
                "0123456789",
                "alice@example.com",
                101L,
                LocalDate.now().minusDays(1),
                LocalDate.now().plusDays(1),
                BookingStatus.CONFIRMED,
                LocalDateTime.now(),
                LocalDateTime.now(),
                null,
                BigDecimal.valueOf(25),
                "Late arrival",
                1,
                "admin",
                "Admin User"
        );
    }

    private Room room(RoomStatus status) {
        return new Room(101L, "101", status, new RoomType(1L, "Standard", null, BigDecimal.valueOf(100), 2));
    }
}
