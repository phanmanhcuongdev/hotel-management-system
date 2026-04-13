package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.UpdateBookingDetailsCommand;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateBookingDetailsServiceTest {

    @Mock
    private LoadBookingPort loadBookingPort;

    @Mock
    private SaveBookingPort saveBookingPort;

    @InjectMocks
    private UpdateBookingDetailsService updateBookingDetailsService;

    @Test
    void updateDetailsBlocksCompletedBooking() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(sampleBooking(BookingStatus.COMPLETED)));

        assertThatThrownBy(() -> updateBookingDetailsService.updateDetails(new UpdateBookingDetailsCommand(
                1L,
                BigDecimal.TEN,
                "Late discount"
        )))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Booking discount and note can only be updated before final closure");
    }

    @Test
    void updateDetailsPersistsDiscountAndTrimmedNote() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(sampleBooking(BookingStatus.CONFIRMED)));
        when(saveBookingPort.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        Booking updated = updateBookingDetailsService.updateDetails(new UpdateBookingDetailsCommand(
                1L,
                BigDecimal.valueOf(12.5),
                "  VIP adjustment  "
        ));

        assertThat(updated.discount()).isEqualByComparingTo("12.5");
        assertThat(updated.note()).isEqualTo("VIP adjustment");
        verify(saveBookingPort).save(any());
    }

    private Booking sampleBooking(BookingStatus status) {
        return new Booking(
                1L,
                "Alice",
                "0123456789",
                "alice@example.com",
                101L,
                LocalDate.now(),
                LocalDate.now().plusDays(2),
                status,
                LocalDateTime.now().minusDays(1),
                LocalDateTime.now().minusHours(1),
                3,
                BigDecimal.ZERO,
                null,
                1,
                "admin",
                "Admin User"
        );
    }
}
