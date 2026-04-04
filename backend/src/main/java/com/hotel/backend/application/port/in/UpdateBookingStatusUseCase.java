package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;

public interface UpdateBookingStatusUseCase {
    Booking updateStatus(Long bookingId, BookingStatus newStatus);
}
