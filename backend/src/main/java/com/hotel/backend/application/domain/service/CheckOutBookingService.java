package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.BookedRoom;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.CheckOutBookingUseCase;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookedRoomPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@UseCase
@RequiredArgsConstructor
public class CheckOutBookingService implements CheckOutBookingUseCase {

    private final LoadBookingPort loadBookingPort;
    private final LoadBookedRoomPort loadBookedRoomPort;
    private final LoadRoomPort loadRoomPort;
    private final SaveBookedRoomPort saveBookedRoomPort;
    private final SaveBookingPort saveBookingPort;
    private final SaveRoomPort saveRoomPort;

    @Override
    @Transactional
    public Booking checkOut(Long bookingId) {
        Booking booking = loadBookingPort.loadBookingById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.status() != BookingStatus.CONFIRMED) {
            throw new BusinessConflictException("Only confirmed bookings can be checked out");
        }

        BookedRoom bookedRoom = loadBookedRoomPort.loadByBookingId(booking.id())
                .orElseThrow(() -> new BusinessConflictException("Booking has not been checked in yet"));

        if (!bookedRoom.checkedIn()) {
            throw new BusinessConflictException("Booking has not been checked in yet");
        }

        saveBookedRoomPort.save(new BookedRoom(
                bookedRoom.id(),
                bookedRoom.bookingId(),
                bookedRoom.roomId(),
                bookedRoom.checkIn(),
                bookedRoom.checkOut(),
                false
        ));

        Booking completedBooking = new Booking(
                booking.id(),
                booking.guestName(),
                booking.phoneNumber(),
                booking.email(),
                booking.roomId(),
                booking.checkIn(),
                booking.checkOut(),
                BookingStatus.COMPLETED,
                booking.createdAt(),
                LocalDateTime.now(),
                booking.clientId(),
                booking.discount(),
                booking.note(),
                booking.userId(),
                booking.userUsername(),
                booking.userFullName()
        );

        Booking savedBooking = saveBookingPort.save(completedBooking);

        Room room = loadRoomPort.loadRoomById(booking.roomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (room.status() != RoomStatus.MAINTENANCE) {
            saveRoomPort.saveRoom(new Room(
                    room.id(),
                    room.roomNumber(),
                    RoomStatus.AVAILABLE,
                    room.type()
            ));
        }

        return savedBooking;
    }
}
