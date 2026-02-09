package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;

public final class BookingMapper {
    private BookingMapper() {}

    public static Booking toDomain(BookingJpaEntity e) {
        return new Booking(
                e.id,
                e.userId,
                e.roomId,
                e.checkIn,
                e.checkOut,
                BookingStatus.valueOf(e.status)
        );
    }

    public static BookingJpaEntity toEntity(Booking b) {
        BookingJpaEntity e = new BookingJpaEntity();
        e.id = b.id();
        e.userId = b.userId();
        e.roomId = b.roomId();
        e.checkIn = b.checkIn();
        e.checkOut = b.checkOut();
        e.status = b.status().name();
        return e;
    }
}