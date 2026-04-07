package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.UpdateBookingStatusUseCase;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@UseCase
@RequiredArgsConstructor
public class UpdateBookingStatusService implements UpdateBookingStatusUseCase {

    private final LoadBookingPort loadBookingPort;
    private final SaveBookingPort saveBookingPort;

    @Override
    public Booking updateStatus(Long bookingId, BookingStatus newStatus) {
        Booking booking = loadBookingPort.loadBookingById(bookingId)
                .orElseThrow(() -> new IllegalStateException("Booking not found"));

        validateTransition(booking.status(), newStatus);

        Booking updated = new Booking(
                booking.id(),
                booking.guestName(),
                booking.phoneNumber(),
                booking.email(),
                booking.roomId(),
                booking.checkIn(),
                booking.checkOut(),
                newStatus,
                booking.createdAt(),
                LocalDateTime.now()
        );

        return saveBookingPort.save(updated);
    }

    private void validateTransition(BookingStatus current, BookingStatus next) {
        boolean valid = switch (current) {
            case PENDING -> next == BookingStatus.CONFIRMED || next == BookingStatus.CANCELLED;
            case CONFIRMED -> next == BookingStatus.COMPLETED || next == BookingStatus.CANCELLED;
            case CANCELLED, COMPLETED -> false;
        };

        if (!valid) {
            throw new IllegalArgumentException(
                    "Invalid status transition: " + current + " -> " + next);
        }
    }
}
