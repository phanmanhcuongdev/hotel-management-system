package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.GetBookingsQuery;

import java.time.LocalDate;
import java.util.List;

public interface LoadBookingsPort {
    List<Booking> loadBookings(GetBookingsQuery query);

    boolean existsActiveOverlap(Long roomId, LocalDate checkIn, LocalDate checkOut, List<BookingStatus> statuses);
}
