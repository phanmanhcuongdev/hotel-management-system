package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;

public interface UpdateBookingPort {
    Booking updateStatus(Long id, BookingStatus status);
}
