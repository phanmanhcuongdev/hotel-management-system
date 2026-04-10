package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

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
    private final SaveBookingPort saveBookingPort;
    private final SaveRoomPort saveRoomPort;

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Booking create(CreateBookingCommand cmd) {
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

        Room room = loadRoomPort.loadRoomById(cmd.roomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        boolean hasOverlap = loadBookingsPort.existsActiveOverlap(
                cmd.roomId(),
                cmd.checkIn(),
                cmd.checkOut(),
                ACTIVE_BOOKING_STATUSES
        );

        if (hasOverlap) {
            throw new BusinessConflictException("Room already has an active booking in the requested date range");
        }

        LocalDateTime now = LocalDateTime.now();
        Booking booking = new Booking(
                null,
                cmd.guestName(),
                cmd.phoneNumber(),
                cmd.email(),
                cmd.roomId(),
                cmd.checkIn(),
                cmd.checkOut(),
                BookingStatus.PENDING,
                now,
                now
        );

        Booking savedBooking = saveBookingPort.save(booking);

        if (room.status() != RoomStatus.OCCUPIED) {
            saveRoomPort.saveRoom(new Room(
                    room.id(),
                    room.roomNumber(),
                    RoomStatus.OCCUPIED,
                    room.type()
            ));
        }

        return savedBooking;
    }
}
