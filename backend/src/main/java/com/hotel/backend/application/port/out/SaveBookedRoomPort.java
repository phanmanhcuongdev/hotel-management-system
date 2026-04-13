package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.BookedRoom;

public interface SaveBookedRoomPort {
    BookedRoom save(BookedRoom bookedRoom);
}
