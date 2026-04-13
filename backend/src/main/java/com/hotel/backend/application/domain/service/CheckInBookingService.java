package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.BookedRoom;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.CheckInBookingUseCase;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.SaveBookedRoomPort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@UseCase
@RequiredArgsConstructor
public class CheckInBookingService implements CheckInBookingUseCase {

    private final LoadBookingPort loadBookingPort;
    private final LoadBookedRoomPort loadBookedRoomPort;
    private final LoadRoomPort loadRoomPort;
    private final SaveBookedRoomPort saveBookedRoomPort;
    private final SaveRoomPort saveRoomPort;

    @Override
    @Transactional
    public Booking checkIn(Long bookingId) {
        Booking booking = loadBookingPort.loadBookingById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.status() != BookingStatus.CONFIRMED) {
            throw new BusinessConflictException("Only confirmed bookings can be checked in");
        }

        LocalDate today = LocalDate.now();
        if (today.isBefore(booking.checkIn()) || !today.isBefore(booking.checkOut())) {
            throw new BusinessConflictException("Booking cannot be checked in outside the stay date range");
        }

        Room room = loadRoomPort.loadRoomById(booking.roomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (room.status() == RoomStatus.MAINTENANCE) {
            throw new BusinessConflictException("Room is under maintenance and cannot be checked in");
        }

        BookedRoom currentStay = loadBookedRoomPort.loadByBookingId(booking.id())
                .orElse(new BookedRoom(null, booking.id(), booking.roomId(), booking.checkIn(), booking.checkOut(), false));

        if (currentStay.checkedIn()) {
            throw new BusinessConflictException("Booking is already checked in");
        }

        saveBookedRoomPort.save(new BookedRoom(
                currentStay.id(),
                booking.id(),
                booking.roomId(),
                booking.checkIn(),
                booking.checkOut(),
                true
        ));

        if (room.status() != RoomStatus.OCCUPIED) {
            saveRoomPort.saveRoom(new Room(
                    room.id(),
                    room.roomNumber(),
                    RoomStatus.OCCUPIED,
                    room.type()
            ));
        }

        return booking;
    }
}
