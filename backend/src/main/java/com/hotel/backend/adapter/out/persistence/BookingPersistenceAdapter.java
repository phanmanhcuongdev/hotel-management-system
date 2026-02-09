package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.port.out.SaveBookingPort;

public class BookingPersistenceAdapter implements SaveBookingPort {

    private final SpringDataBookingRepository bookingRepo;

    public BookingPersistenceAdapter(SpringDataBookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    @Override
    public Booking save(Booking booking) {
        BookingJpaEntity saved = bookingRepo.save(BookingMapper.toEntity(booking));
        return BookingMapper.toDomain(saved);
    }
}