package com.hotel.backend.adapter.out.persistence.booking;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class BookingPersistenceAdapter implements SaveBookingPort, LoadBookingPort, LoadBookingsPort {

    private final SpringDataBookingRepository bookingRepo;

    @Override
    public Booking save(Booking booking) {
        BookingJpaEntity saved = bookingRepo.save(BookingMapper.toEntity(booking));
        return BookingMapper.toDomain(saved);
    }

    @Override
    public Optional<Booking> loadBookingById(Long id) {
        return bookingRepo.findById(id).map(BookingMapper::toDomain);
    }

    @Override
    public List<Booking> loadBookings(Optional<BookingStatus> status) {
        if (status.isPresent()) {
            return bookingRepo.findByStatus(status.get().name())
                    .stream()
                    .map(BookingMapper::toDomain)
                    .toList();
        }
        return bookingRepo.findAll()
                .stream()
                .map(BookingMapper::toDomain)
                .toList();
    }
}
