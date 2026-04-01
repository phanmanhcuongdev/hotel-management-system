package com.hotel.backend.adapter.out.persistence;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.application.port.out.UpdateBookingPort;

import java.util.List;
import java.util.Optional;

public class BookingPersistenceAdapter implements SaveBookingPort, LoadBookingsPort, LoadBookingPort, UpdateBookingPort {

    private final SpringDataBookingRepository bookingRepo;

    public BookingPersistenceAdapter(SpringDataBookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    @Override
    public Booking save(Booking booking) {
        BookingJpaEntity saved = bookingRepo.save(BookingMapper.toEntity(booking));
        return BookingMapper.toDomain(saved);
    }

    @Override
    public List<Booking> loadAll() {
        return bookingRepo.findAll().stream().map(BookingMapper::toDomain).toList();
    }

    @Override
    public List<Booking> loadByStatus(BookingStatus status) {
        return bookingRepo.findByStatus(status.name()).stream().map(BookingMapper::toDomain).toList();
    }

    @Override
    public Optional<Booking> loadById(Long id) {
        return bookingRepo.findById(id).map(BookingMapper::toDomain);
    }

    @Override
    public Booking updateStatus(Long id, BookingStatus status) {
        BookingJpaEntity existing = bookingRepo.findById(id)
                .orElseThrow(() -> new IllegalStateException("Booking not found: " + id));
        existing.status = status.name();
        BookingJpaEntity saved = bookingRepo.save(existing);
        return BookingMapper.toDomain(saved);
    }
}
