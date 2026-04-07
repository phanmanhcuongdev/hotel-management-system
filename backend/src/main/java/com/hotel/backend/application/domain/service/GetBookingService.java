package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.BookingWithRoom;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@UseCase
@RequiredArgsConstructor
public class GetBookingService implements GetBookingUseCase {

    private final LoadBookingPort loadBookingPort;
    private final LoadRoomPort loadRoomPort;

    @Override
    public Optional<BookingWithRoom> getById(Long id) {
        return loadBookingPort.loadBookingById(id).map(booking -> {
            Room room = loadRoomPort.loadRoomById(booking.roomId())
                    .orElseThrow(() -> new IllegalStateException("Room not found for booking " + id));
            return new BookingWithRoom(booking, room);
        });
    }
}
