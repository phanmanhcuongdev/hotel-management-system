package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.model.BillSummary;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.PaymentType;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.CreateBookingBillCommand;
import com.hotel.backend.application.port.out.LoadBillSummaryPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.SaveBillPort;
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

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateBookingBillServiceTest {

    @Mock
    private LoadBookingPort loadBookingPort;

    @Mock
    private LoadBillSummaryPort loadBillSummaryPort;

    @Mock
    private SaveBillPort saveBillPort;

    @Mock
    private LoadUserByUsernamePort loadUserByUsernamePort;

    @InjectMocks
    private CreateBookingBillService createBookingBillService;

    @Test
    void createBillRequiresCompletedBooking() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking(BookingStatus.CONFIRMED)));

        assertThatThrownBy(() -> createBookingBillService.createBookingBill(new CreateBookingBillCommand(1L, "CASH", null, "admin")))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Bill can only be created after checkout is completed");
    }

    @Test
    void createBillBlocksWhenBillAlreadyExists() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking(BookingStatus.COMPLETED)));
        when(loadBillSummaryPort.loadBookingBillSummary(1L)).thenReturn(summary(true));

        assertThatThrownBy(() -> createBookingBillService.createBookingBill(new CreateBookingBillCommand(1L, "CASH", null, "admin")))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Bill already exists for this booking");
    }

    @Test
    void createBillPersistsWithResolvedUserAndPaymentType() {
        when(loadBookingPort.loadBookingById(1L)).thenReturn(Optional.of(booking(BookingStatus.COMPLETED)));
        when(loadBillSummaryPort.loadBookingBillSummary(1L)).thenReturn(summary(false));
        when(loadUserByUsernamePort.loadByUsername("admin")).thenReturn(Optional.of(new User(7, "admin", "", "Admin", "ADMIN", null, null)));
        when(saveBillPort.createBill(1L, 7, PaymentType.CARD, "Paid at front desk")).thenReturn(summary(true));

        createBookingBillService.createBookingBill(new CreateBookingBillCommand(1L, "CARD", "Paid at front desk", "admin"));

        verify(saveBillPort).createBill(1L, 7, PaymentType.CARD, "Paid at front desk");
    }

    private Booking booking(BookingStatus status) {
        return new Booking(
                1L,
                "Alice",
                "0123456789",
                "alice@example.com",
                101L,
                LocalDate.now().minusDays(2),
                LocalDate.now(),
                status,
                LocalDateTime.now(),
                LocalDateTime.now(),
                null,
                BigDecimal.valueOf(20),
                "Loyalty discount",
                1,
                "admin",
                "Admin User"
        );
    }

    private BillSummary summary(boolean created) {
        return new BillSummary(
                created ? 5 : null,
                1L,
                BookingStatus.COMPLETED.name(),
                "Alice",
                "101",
                LocalDate.now().minusDays(2),
                LocalDate.now(),
                2,
                BigDecimal.valueOf(20),
                "Loyalty discount",
                BigDecimal.valueOf(200),
                BigDecimal.ZERO,
                BigDecimal.valueOf(200),
                created ? BigDecimal.valueOf(200) : null,
                created ? PaymentType.CASH : null,
                created ? LocalDate.now() : null,
                null,
                created,
                List.of()
        );
    }
}
