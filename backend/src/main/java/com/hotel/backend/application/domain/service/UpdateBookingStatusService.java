package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetBookingsQuery;
import com.hotel.backend.application.port.in.UpdateBookingStatusUseCase;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@UseCase
@RequiredArgsConstructor
public class UpdateBookingStatusService implements UpdateBookingStatusUseCase {

    private static final List<BookingStatus> ACTIVE_BOOKING_STATUSES = List.of(
            BookingStatus.PENDING,
            BookingStatus.CONFIRMED
    );

    private final LoadBookingPort loadBookingPort;
    private final LoadBookingsPort loadBookingsPort;
    private final LoadBookedRoomPort loadBookedRoomPort;
    private final LoadRoomPort loadRoomPort;
    private final SaveBookingPort saveBookingPort;
    private final SaveRoomPort saveRoomPort;

    @Override
    @Transactional
    public Booking updateStatus(Long bookingId, BookingStatus newStatus) {
        Booking booking = loadBookingPort.loadBookingById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (newStatus == BookingStatus.CANCELLED
                && loadBookedRoomPort.loadByBookingId(bookingId).map(com.hotel.backend.application.domain.model.BookedRoom::checkedIn).orElse(false)) {
            throw new BusinessConflictException("Checked-in bookings must use checkout instead of cancel");
        }

        validateTransition(booking.status(), newStatus);

        Booking updated = new Booking(
                booking.id(),
                booking.guestName(),
                booking.phoneNumber(),
                booking.email(),
                booking.roomId(),
                booking.checkIn(),
                booking.checkOut(),
                newStatus,
                booking.createdAt(),
                LocalDateTime.now(),
                booking.clientId(),
                booking.discount(),
                booking.note(),
                booking.userId(),
                booking.userUsername(),
                booking.userFullName()
        );

        Booking savedBooking = saveBookingPort.save(updated);

        if (newStatus == BookingStatus.CANCELLED || newStatus == BookingStatus.COMPLETED) {
            syncRoomStatusAfterClosure(savedBooking);
        }

        return savedBooking;
    }

    private void validateTransition(BookingStatus current, BookingStatus next) {
        boolean valid = switch (current) {
            case PENDING -> next == BookingStatus.CONFIRMED || next == BookingStatus.CANCELLED;
            case CONFIRMED -> next == BookingStatus.CANCELLED;
            case CANCELLED, COMPLETED -> false;
        };

        if (!valid) {
            throw new BusinessConflictException(
                    "Invalid status transition: " + current + " -> " + next);
        }
    }

    private void syncRoomStatusAfterClosure(Booking booking) {
        Room room = loadRoomPort.loadRoomById(booking.roomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (room.status() == RoomStatus.MAINTENANCE) {
            return;
        }

        LocalDate today = LocalDate.now();
        boolean hasRemainingActiveBooking = loadBookingsPort.loadBookings(new GetBookingsQuery(
                        Optional.empty(),
                        Optional.empty(),
                        Optional.of(booking.roomId()),
                        Optional.empty(),
                        Optional.empty(),
                        Optional.empty(),
                        Optional.empty()
                )).stream()
                .filter(existing -> !existing.id().equals(booking.id()))
                .filter(existing -> existing.roomId().equals(booking.roomId()))
                .filter(existing -> ACTIVE_BOOKING_STATUSES.contains(existing.status()))
                .anyMatch(existing -> existing.checkOut().isAfter(today));

        if (!hasRemainingActiveBooking) {
            saveRoomPort.saveRoom(new Room(
                    room.id(),
                    room.roomNumber(),
                    RoomStatus.AVAILABLE,
                    room.type()
            ));
        }
    }
}
