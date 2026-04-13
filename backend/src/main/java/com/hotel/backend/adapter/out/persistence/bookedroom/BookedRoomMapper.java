package com.hotel.backend.adapter.out.persistence.bookedroom;

import com.hotel.backend.application.domain.model.BookedRoom;

public final class BookedRoomMapper {
    private BookedRoomMapper() {
    }

    public static BookedRoom toDomain(BookedRoomEntity entity) {
        return new BookedRoom(
                entity.id,
                entity.booking.id,
                entity.room.id,
                entity.checkin,
                entity.checkout,
                Boolean.TRUE.equals(entity.isCheckedIn)
        );
    }
}
