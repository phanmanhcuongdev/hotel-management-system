package com.hotel.backend.adapter.out.persistence.booking;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;

import java.math.BigDecimal;

public final class BookingMapper {
    private BookingMapper() {}

    public static Booking toDomain(BookingJpaEntity e) {
        return new Booking(
                e.id,
                e.guestName,
                e.phoneNumber,
                e.email,
                e.roomId,
                e.checkIn,
                e.checkOut,
                BookingStatus.valueOf(e.status),
                e.createdAt,
                e.updatedAt,
                e.client != null ? e.client.id : null,
                e.discount != null ? e.discount : BigDecimal.ZERO,
                e.note,
                e.user != null ? e.user.getId() : null,
                e.user != null ? e.user.getUsername() : null,
                e.user != null ? e.user.getFullName() : null
        );
    }

    public static BookingJpaEntity toEntity(Booking b) {
        BookingJpaEntity e = new BookingJpaEntity();
        e.id = b.id();
        e.guestName = b.guestName();
        e.phoneNumber = b.phoneNumber();
        e.email = b.email();
        e.roomId = b.roomId();
        e.checkIn = b.checkIn();
        e.checkOut = b.checkOut();
        e.status = b.status().name();
        e.createdAt = b.createdAt();
        e.updatedAt = b.updatedAt();
        e.discount = b.discount();
        e.note = b.note();
        return e;
    }
}
