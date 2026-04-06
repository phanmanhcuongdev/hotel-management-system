package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@UseCase
@RequiredArgsConstructor
public class CreateBookingService implements CreateBookingUseCase {

    private final LoadRoomPort loadRoomPort;
    private final SaveBookingPort saveBookingPort;

    @Override
    public Booking create(CreateBookingCommand cmd) {
        if (cmd.checkIn() == null || cmd.checkOut() == null || !cmd.checkIn().isBefore(cmd.checkOut())) {
            throw new IllegalArgumentException("checkIn must be before checkOut");
        }

        if (cmd.guestName() == null || cmd.guestName().isBlank()) {
            throw new IllegalArgumentException("guestName is required");
        }

        if (cmd.phoneNumber() == null || cmd.phoneNumber().isBlank()) {
            throw new IllegalArgumentException("phoneNumber is required");
        }

        Room room = loadRoomPort.loadRoomById(cmd.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        if (room.status() != RoomStatus.AVAILABLE) {
            throw new IllegalStateException("Room is not available");
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

        return saveBookingPort.save(booking);
    }
}
