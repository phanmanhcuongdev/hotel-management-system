package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Booking;

public interface SaveBookingPort {
    Booking save(Booking booking);
}