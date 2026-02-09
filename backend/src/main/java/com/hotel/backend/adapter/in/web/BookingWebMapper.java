package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.RoomShortResponse;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.Room;

public final class BookingWebMapper {
    private BookingWebMapper() {}

    public static BookingResponse toResponse(Booking booking, Room room) {
        return new BookingResponse(
                booking.id(),
                booking.userId(),
                new RoomShortResponse(room.id(), room.roomNumber()),
                booking.checkIn(),
                booking.checkOut(),
                booking.status().name()
        );
    }
}