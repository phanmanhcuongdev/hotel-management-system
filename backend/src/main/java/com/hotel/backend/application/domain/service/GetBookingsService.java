package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.BookingWithRoom;
import com.hotel.backend.application.port.in.GetBookingsQuery;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@UseCase
@RequiredArgsConstructor
public class GetBookingsService implements GetBookingsUseCase {

    private final LoadBookingsPort loadBookingsPort;
    private final LoadRoomPort loadRoomPort;

    @Override
    public List<BookingWithRoom> getAll(GetBookingsQuery query) {
        return loadBookingsPort.loadBookings(query).stream()
                .map(booking -> {
                    Optional<Room> room = loadRoomPort.loadRoomById(booking.roomId());
                    return room.map(r -> new BookingWithRoom(booking, r)).orElse(null);
                })
                .filter(bwr -> bwr != null)
                .toList();
    }
}
