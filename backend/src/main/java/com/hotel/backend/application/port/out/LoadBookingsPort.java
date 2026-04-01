package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;

import java.util.List;

public interface LoadBookingsPort {
    List<Booking> loadAll();
    List<Booking> loadByStatus(BookingStatus status);
}
