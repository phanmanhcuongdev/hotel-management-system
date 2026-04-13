package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.model.BookedRoom;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.ServiceCatalogItem;
import com.hotel.backend.application.port.in.AddBookingUsedServiceCommand;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadServiceCatalogPort;
import com.hotel.backend.application.port.out.SaveUsedServicePort;
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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AddBookingUsedServiceServiceTest {

    @Mock
    private LoadBookingPort loadBookingPort;

    @Mock
    private LoadBookedRoomPort loadBookedRoomPort;

    @Mock
    private LoadServiceCatalogPort loadServiceCatalogPort;

    @Mock
    private SaveUsedServicePort saveUsedServicePort;

    @InjectMocks
    private AddBookingUsedServiceService addBookingUsedServiceService;

    @Test
    void addUsedServiceRequiresCheckedInStay() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking(BookingStatus.CONFIRMED)));
        when(loadBookedRoomPort.loadByBookingId(1L)).thenReturn(Optional.of(
                new BookedRoom(5, 1L, 101L, LocalDate.now(), LocalDate.now().plusDays(1), false)
        ));

        assertThatThrownBy(() -> addBookingUsedServiceService.addUsedService(
                new AddBookingUsedServiceCommand(1L, 2, 1, BigDecimal.ZERO)
        )).isInstanceOf(BusinessConflictException.class)
                .hasMessage("Used services can only be added while the guest is checked in");
    }

    @Test
    void addUsedServicePersistsForCheckedInStay() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking(BookingStatus.CONFIRMED)));
        when(loadBookedRoomPort.loadByBookingId(1L)).thenReturn(Optional.of(
                new BookedRoom(5, 1L, 101L, LocalDate.now(), LocalDate.now().plusDays(1), true)
        ));
        when(loadServiceCatalogPort.loadServiceById(2)).thenReturn(Optional.of(
                new ServiceCatalogItem(2, "Laundry", "kg", BigDecimal.valueOf(5))
        ));

        addBookingUsedServiceService.addUsedService(new AddBookingUsedServiceCommand(1L, 2, 3, BigDecimal.ONE));

        verify(saveUsedServicePort).saveUsedService(5, 2, 3, BigDecimal.ONE);
    }

    private Booking booking(BookingStatus status) {
        return new Booking(
                1L,
                "Alice",
                "0123456789",
                "alice@example.com",
                101L,
                LocalDate.now(),
                LocalDate.now().plusDays(1),
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
}
