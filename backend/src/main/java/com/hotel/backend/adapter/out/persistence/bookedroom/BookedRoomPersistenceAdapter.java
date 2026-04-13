package com.hotel.backend.adapter.out.persistence.bookedroom;

import com.hotel.backend.adapter.out.persistence.booking.SpringDataBookingRepository;
import com.hotel.backend.adapter.out.persistence.room.SpringDataRoomRepository;
import com.hotel.backend.application.domain.model.BookedRoom;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.SaveBookedRoomPort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class BookedRoomPersistenceAdapter implements LoadBookedRoomPort, SaveBookedRoomPort {

    private final SpringDataBookedRoomRepository bookedRoomRepository;
    private final SpringDataBookingRepository bookingRepository;
    private final SpringDataRoomRepository roomRepository;

    @Override
    public Optional<BookedRoom> loadByBookingId(Long bookingId) {
        return bookedRoomRepository.findFirstByBooking_IdOrderByIdAsc(bookingId)
                .map(BookedRoomMapper::toDomain);
    }

    @Override
    public BookedRoom save(BookedRoom bookedRoom) {
        BookedRoomEntity entity;
        if (bookedRoom.id() != null) {
            entity = bookedRoomRepository.findById(bookedRoom.id()).orElseGet(BookedRoomEntity::new);
        } else {
            entity = new BookedRoomEntity();
        }

        entity.id = bookedRoom.id();
        entity.checkin = bookedRoom.checkIn();
        entity.checkout = bookedRoom.checkOut();
        entity.isCheckedIn = bookedRoom.checkedIn();
        entity.booking = bookingRepository.getReferenceById(bookedRoom.bookingId());
        entity.room = roomRepository.getReferenceById(bookedRoom.roomId());

        return BookedRoomMapper.toDomain(bookedRoomRepository.save(entity));
    }
}
