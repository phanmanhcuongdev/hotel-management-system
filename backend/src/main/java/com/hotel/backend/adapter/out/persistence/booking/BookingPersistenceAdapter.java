package com.hotel.backend.adapter.out.persistence.booking;

import com.hotel.backend.adapter.out.persistence.client.SpringDataClientRepository;
import com.hotel.backend.adapter.out.persistence.user.UserRepository;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.GetBookingsQuery;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.JoinType;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class BookingPersistenceAdapter implements SaveBookingPort, LoadBookingPort, LoadBookingsPort {

    private final SpringDataBookingRepository bookingRepo;
    private final SpringDataClientRepository clientRepository;
    private final UserRepository userRepository;

    @Override
    public Booking save(Booking booking) {
        return saveInternal(booking, null, false);
    }

    @Override
    public Booking save(Booking booking, Integer clientId) {
        return saveInternal(booking, clientId, true);
    }

    @Override
    public Optional<Booking> loadBookingById(Long id) {
        return bookingRepo.findDetailById(id).map(BookingMapper::toDomain);
    }

    @Override
    public List<Booking> loadBookings(GetBookingsQuery query) {
        return bookingRepo.findAll(buildBookingSpecification(query))
                .stream()
                .map(BookingMapper::toDomain)
                .toList();
    }

    @Override
    public boolean existsActiveOverlap(Long roomId, LocalDate checkIn, LocalDate checkOut, List<BookingStatus> statuses) {
        List<String> statusNames = statuses.stream()
                .map(BookingStatus::name)
                .toList();

        return !bookingRepo.findActiveOverlapsForUpdate(roomId, checkIn, checkOut, statusNames).isEmpty();
    }

    private Specification<BookingJpaEntity> buildBookingSpecification(GetBookingsQuery query) {
        Specification<BookingJpaEntity> specification = (root, ignoredQuery, cb) -> cb.conjunction();

        if (query.status().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.equal(root.get("status"), query.status().get().name()));
        }

        if (query.roomId().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.equal(root.get("roomId"), query.roomId().get()));
        }

        if (query.guestName().isPresent() && !query.guestName().get().isBlank()) {
            String normalizedGuestName = "%" + query.guestName().get().trim().toLowerCase() + "%";
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.like(cb.lower(root.get("guestName")), normalizedGuestName));
        }

        if (query.phoneNumber().isPresent() && !query.phoneNumber().get().isBlank()) {
            String normalizedPhone = "%" + query.phoneNumber().get().trim().toLowerCase() + "%";
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.like(cb.lower(root.get("phoneNumber")), normalizedPhone));
        }

        if (query.checkInDate().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.greaterThanOrEqualTo(root.get("checkIn"), query.checkInDate().get()));
        }

        if (query.checkOutDate().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.lessThanOrEqualTo(root.get("checkOut"), query.checkOutDate().get()));
        }

        if (query.keyword().isPresent() && !query.keyword().get().isBlank()) {
            String keyword = query.keyword().get().trim();
            String normalizedKeyword = "%" + keyword.toLowerCase() + "%";
            Optional<Long> maybeBookingId = parseLong(keyword);

            specification = specification.and((root, ignoredQuery, cb) -> {
                var roomJoin = root.join("room", JoinType.LEFT);
                var guestNamePredicate = cb.like(cb.lower(root.get("guestName")), normalizedKeyword);
                var phonePredicate = cb.like(cb.lower(root.get("phoneNumber")), normalizedKeyword);
                var emailPredicate = cb.like(cb.lower(root.get("email")), normalizedKeyword);
                var roomNumberPredicate = cb.like(cb.lower(roomJoin.get("roomNumber")), normalizedKeyword);

                if (maybeBookingId.isPresent()) {
                    return cb.or(
                            cb.equal(root.get("id"), maybeBookingId.get()),
                            guestNamePredicate,
                            phonePredicate,
                            emailPredicate,
                            roomNumberPredicate
                    );
                }

                return cb.or(guestNamePredicate, phonePredicate, emailPredicate, roomNumberPredicate);
            });
        }

        return specification;
    }

    private Optional<Long> parseLong(String value) {
        try {
            return Optional.of(Long.parseLong(value));
        } catch (NumberFormatException ex) {
            return Optional.empty();
        }
    }

    private Booking saveInternal(Booking booking, Integer clientId, boolean updateClientReference) {
        BookingJpaEntity entity;
        if (booking.id() != null) {
            entity = bookingRepo.findById(booking.id()).orElseGet(BookingJpaEntity::new);
        } else {
            entity = new BookingJpaEntity();
        }

        entity.id = booking.id();
        entity.guestName = booking.guestName();
        entity.phoneNumber = booking.phoneNumber();
        entity.email = booking.email();
        entity.roomId = booking.roomId();
        entity.checkIn = booking.checkIn();
        entity.checkOut = booking.checkOut();
        entity.status = booking.status().name();
        entity.createdAt = booking.createdAt();
        entity.updatedAt = booking.updatedAt();
        entity.discount = booking.discount();
        entity.note = booking.note();
        entity.user = booking.userId() != null ? userRepository.getReferenceById(booking.userId()) : null;

        if (updateClientReference || booking.clientId() != null || entity.id != null) {
            Integer nextClientId = booking.clientId() != null ? booking.clientId() : clientId;
            entity.client = nextClientId != null ? clientRepository.getReferenceById(nextClientId) : null;
        }

        return BookingMapper.toDomain(bookingRepo.save(entity));
    }
}
