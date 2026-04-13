package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.BookedRoom;

import java.util.Optional;

public interface LoadBookedRoomPort {
    Optional<BookedRoom> loadByBookingId(Long bookingId);
}
