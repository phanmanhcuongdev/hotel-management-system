package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.BookedRoom;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
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

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateBookingStatusServiceTest {

    @Mock
    private LoadBookingPort loadBookingPort;

    @Mock
    private LoadBookingsPort loadBookingsPort;

    @Mock
    private LoadBookedRoomPort loadBookedRoomPort;

    @Mock
    private LoadRoomPort loadRoomPort;

    @Mock
    private SaveBookingPort saveBookingPort;

    @Mock
    private SaveRoomPort saveRoomPort;

    @InjectMocks
    private UpdateBookingStatusService updateBookingStatusService;

    @Test
    void invalidTransitionThrowsBusinessConflictException() {
        Booking booking = booking(1L, BookingStatus.PENDING, 101L, LocalDate.now().plusDays(1), LocalDate.now().plusDays(3));
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking));

        assertThatThrownBy(() -> updateBookingStatusService.updateStatus(1L, BookingStatus.COMPLETED))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Invalid status transition: PENDING -> COMPLETED");

        verify(saveBookingPort, never()).save(any());
        verify(saveRoomPort, never()).saveRoom(any());
    }

    @Test
    void confirmedToCancelledKeepsRoomOccupiedWhenAnotherActiveBookingExists() {
        Booking closingBooking = booking(1L, BookingStatus.CONFIRMED, 101L, LocalDate.now(), LocalDate.now().plusDays(1));
        Booking remainingBooking = booking(2L, BookingStatus.CONFIRMED, 101L, LocalDate.now().plusDays(1), LocalDate.now().plusDays(3));
        Room room = room(101L, RoomStatus.OCCUPIED);

        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(closingBooking));
        when(loadBookedRoomPort.loadByBookingId(1L)).thenReturn(Optional.empty());
        when(saveBookingPort.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        when(loadRoomPort.loadRoomById(101L)).thenReturn(Optional.of(room));
        when(loadBookingsPort.loadBookings(any())).thenReturn(List.of(
                booking(1L, BookingStatus.CANCELLED, 101L, closingBooking.checkIn(), closingBooking.checkOut()),
                remainingBooking
        ));

        updateBookingStatusService.updateStatus(1L, BookingStatus.CANCELLED);

        verify(saveRoomPort, never()).saveRoom(any());
    }

    @Test
    void cancellingCheckedInBookingThrowsConflict() {
        Booking booking = booking(1L, BookingStatus.CONFIRMED, 101L, LocalDate.now(), LocalDate.now().plusDays(1));
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking));
        when(loadBookedRoomPort.loadByBookingId(1L)).thenReturn(Optional.of(
                new BookedRoom(3, 1L, 101L, booking.checkIn(), booking.checkOut(), true)
        ));

        assertThatThrownBy(() -> updateBookingStatusService.updateStatus(1L, BookingStatus.CANCELLED))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Checked-in bookings must use checkout instead of cancel");
    }

    private Booking booking(Long id, BookingStatus status, Long roomId, LocalDate checkIn, LocalDate checkOut) {
        return new Booking(
                id,
                "Alice",
                "0123456789",
                "alice@example.com",
                roomId,
                checkIn,
                checkOut,
                status,
                LocalDateTime.now(),
                LocalDateTime.now(),
                null,
                BigDecimal.ZERO,
                null,
                1,
                "admin",
                "Admin User"
        );
    }

    private Room room(Long id, RoomStatus status) {
        return new Room(id, "101", status, new RoomType(1L, "Standard", null, BigDecimal.valueOf(100), 2));
    }
}
