package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Client;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadClientPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.application.port.out.SaveClientPort;
import com.hotel.backend.application.port.out.auth.LoadUserByUsernamePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@UseCase
@RequiredArgsConstructor
public class CreateBookingService implements CreateBookingUseCase {

    private static final List<BookingStatus> ACTIVE_BOOKING_STATUSES = List.of(
            BookingStatus.PENDING,
            BookingStatus.CONFIRMED
    );

    private final LoadRoomPort loadRoomPort;
    private final LoadBookingsPort loadBookingsPort;
    private final LoadClientPort loadClientPort;
    private final SaveClientPort saveClientPort;
    private final SaveBookingPort saveBookingPort;
    private final LoadUserByUsernamePort loadUserByUsernamePort;

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Booking create(CreateBookingCommand cmd) {
        validateCommand(cmd);

        Room room = loadRoomPort.loadRoomById(cmd.roomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (room.status() == RoomStatus.MAINTENANCE) {
            throw new BusinessConflictException("Room is not available for booking while in maintenance");
        }

        boolean hasOverlap = loadBookingsPort.existsActiveOverlap(
                cmd.roomId(),
                cmd.checkIn(),
                cmd.checkOut(),
                ACTIVE_BOOKING_STATUSES
        );

        if (hasOverlap) {
            throw new BusinessConflictException("Room already has an active booking in the requested date range");
        }

        String normalizedPhone = normalizePhoneNumber(cmd.phoneNumber());
        String normalizedEmail = normalizeEmail(cmd.email());
        Client client = loadClientPort.loadByNormalizedPhone(normalizedPhone)
                .map(existing -> existing.needsReview()
                        ? saveClientPort.refreshAutoCreatedClientProfile(existing.id(), cmd.guestName().trim(), normalizedEmail)
                        : existing)
                .orElseGet(() -> saveClientPort.saveAutoCreatedClient(cmd.guestName().trim(), normalizedPhone, normalizedEmail));
        User actor = loadUserByUsernamePort.loadByUsername(cmd.actorUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        LocalDateTime now = LocalDateTime.now();
        Booking booking = new Booking(
                null,
                cmd.guestName().trim(),
                normalizedPhone,
                normalizeEmail(cmd.email()),
                cmd.roomId(),
                cmd.checkIn(),
                cmd.checkOut(),
                BookingStatus.PENDING,
                now,
                now,
                client.id(),
                normalizeDiscount(cmd.discount()),
                normalizeNote(cmd.note()),
                actor.getId(),
                actor.getUsername(),
                actor.getFullName()
        );

        return saveBookingPort.save(booking, client.id());
    }

    private void validateCommand(CreateBookingCommand cmd) {
        if (cmd.checkIn() == null || cmd.checkOut() == null || !cmd.checkIn().isBefore(cmd.checkOut())) {
            throw new IllegalArgumentException("checkIn must be before checkOut");
        }

        if (cmd.checkIn().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("checkIn must be today or later");
        }

        if (cmd.guestName() == null || cmd.guestName().isBlank()) {
            throw new IllegalArgumentException("guestName is required");
        }

        if (cmd.phoneNumber() == null || cmd.phoneNumber().isBlank()) {
            throw new IllegalArgumentException("phoneNumber is required");
        }

        if (cmd.discount() != null && cmd.discount().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("discount cannot be negative");
        }
    }

    private BigDecimal normalizeDiscount(BigDecimal discount) {
        return discount == null ? BigDecimal.ZERO : discount;
    }

    private String normalizePhoneNumber(String phoneNumber) {
        String normalized = phoneNumber.replaceAll("\\D", "");
        if (normalized.isBlank()) {
            throw new IllegalArgumentException("phoneNumber has invalid format");
        }
        if (normalized.length() > 15) {
            throw new IllegalArgumentException("phoneNumber must contain at most 15 digits");
        }
        return normalized;
    }

    private String normalizeEmail(String email) {
        if (email == null || email.isBlank()) {
            return null;
        }
        return email.trim().toLowerCase();
    }

    private String normalizeNote(String note) {
        if (note == null || note.isBlank()) {
            return null;
        }
        return note.trim();
    }
}
