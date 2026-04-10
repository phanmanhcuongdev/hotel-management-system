package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
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
class RoomManagementServiceTest {

    @Mock
    private SaveRoomPort saveRoomPort;

    @Mock
    private LoadRoomPort loadRoomPort;

    @Mock
    private LoadRoomTypePort loadRoomTypePort;

    @Mock
    private LoadBookingsPort loadBookingsPort;

    @InjectMocks
    private RoomManagementService roomManagementService;

    @ParameterizedTest
    @EnumSource(value = RoomStatus.class, names = {"AVAILABLE", "MAINTENANCE"})
    void updateRoomBlocksManualStatusChangeWhenActiveBookingExists(RoomStatus targetStatus) {
        Room existingRoom = new Room(101L, "101", RoomStatus.OCCUPIED, roomType());
        Booking activeBooking = new Booking(
                1L,
                "Alice",
                "0123456789",
                "alice@example.com",
                101L,
                LocalDate.now(),
                LocalDate.now().plusDays(2),
                BookingStatus.CONFIRMED,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(loadRoomPort.existsByRoomNumberAndIdNot("101", 101L)).thenReturn(false);
        when(loadRoomPort.loadRoomById(101L)).thenReturn(Optional.of(existingRoom));
        when(loadBookingsPort.loadBookings(Optional.empty())).thenReturn(List.of(activeBooking));

        assertThatThrownBy(() -> roomManagementService.updateRoom(101L, "101", targetStatus, 1L))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessageContaining("Kh")
                .hasMessageContaining("booking");

        verify(loadRoomTypePort, never()).loadRoomTypeById(1L);
        verify(saveRoomPort, never()).saveRoom(any());
    }

    private RoomType roomType() {
        return new RoomType(1L, "Standard", BigDecimal.valueOf(100), 2);
    }
}
