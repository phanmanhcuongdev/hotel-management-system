package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.BookingStaffResponse;
import com.hotel.backend.adapter.in.web.dto.RoomShortResponse;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.Room;

public final class BookingWebMapper {
    private BookingWebMapper() {}

    public static BookingResponse toResponse(Booking booking, Room room, boolean checkedIn) {
        RoomShortResponse.RoomTypeShortResponse typeResp = room.type() != null
                ? new RoomShortResponse.RoomTypeShortResponse(room.type().id(), room.type().name())
                : null;

        return new BookingResponse(
                booking.id(),
                booking.guestName(),
                booking.phoneNumber(),
                booking.email(),
                booking.clientId(),
                booking.discount(),
                booking.note(),
                booking.userId() != null
                        ? new BookingStaffResponse(booking.userId(), booking.userUsername(), booking.userFullName())
                        : null,
                new RoomShortResponse(room.id(), room.roomNumber(), typeResp),
                booking.checkIn(),
                booking.checkOut(),
                booking.status().name(),
                checkedIn,
                booking.createdAt(),
                booking.updatedAt()
        );
    }
}
