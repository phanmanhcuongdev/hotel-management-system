package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.UpdateBookingDetailsCommand;
import com.hotel.backend.application.port.in.UpdateBookingDetailsUseCase;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@UseCase
@RequiredArgsConstructor
public class UpdateBookingDetailsService implements UpdateBookingDetailsUseCase {

    private final LoadBookingPort loadBookingPort;
    private final SaveBookingPort saveBookingPort;

    @Override
    @Transactional
    public Booking updateDetails(UpdateBookingDetailsCommand command) {
        Booking booking = loadBookingPort.loadBookingById(command.bookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.status() == BookingStatus.CANCELLED || booking.status() == BookingStatus.COMPLETED) {
            throw new BusinessConflictException("Booking discount and note can only be updated before final closure");
        }

        BigDecimal normalizedDiscount = normalizeDiscount(command.discount());
        String normalizedNote = normalizeNote(command.note());

        Booking updated = new Booking(
                booking.id(),
                booking.guestName(),
                booking.phoneNumber(),
                booking.email(),
                booking.roomId(),
                booking.checkIn(),
                booking.checkOut(),
                booking.status(),
                booking.createdAt(),
                LocalDateTime.now(),
                booking.clientId(),
                normalizedDiscount,
                normalizedNote,
                booking.userId(),
                booking.userUsername(),
                booking.userFullName()
        );

        return saveBookingPort.save(updated);
    }

    private BigDecimal normalizeDiscount(BigDecimal discount) {
        if (discount == null) {
            return BigDecimal.ZERO;
        }
        if (discount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("discount cannot be negative");
        }
        return discount;
    }

    private String normalizeNote(String note) {
        if (note == null || note.isBlank()) {
            return null;
        }
        return note.trim();
    }
}
