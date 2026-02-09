package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;

public class CreateBookingService implements CreateBookingUseCase {

    private final LoadRoomPort loadRoomPort;
    private final SaveBookingPort saveBookingPort;

    public CreateBookingService(LoadRoomPort loadRoomPort, SaveBookingPort saveBookingPort) {
        this.loadRoomPort = loadRoomPort;
        this.saveBookingPort = saveBookingPort;
    }

    @Override
    public Booking create(CreateBookingCommand cmd) {
        if (cmd.checkIn() == null || cmd.checkOut() == null || !cmd.checkIn().isBefore(cmd.checkOut())) {
            throw new IllegalArgumentException("checkIn must be before checkOut");
        }

        Room room = loadRoomPort.loadRoomById(cmd.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        if (room.status() != RoomStatus.AVAILABLE) {
            throw new IllegalStateException("Room is not available");
        }

        Booking booking = new Booking(
                null,
                cmd.userId(),
                cmd.roomId(),
                cmd.checkIn(),
                cmd.checkOut(),
                BookingStatus.PENDING
        );

        return saveBookingPort.save(booking);
    }
}