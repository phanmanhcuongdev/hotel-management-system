package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.out.LoadBookingsPort;

import java.util.List;
import java.util.Optional;

public class GetBookingsService implements GetBookingsUseCase {

    private final LoadBookingsPort loadBookingsPort;

    public GetBookingsService(LoadBookingsPort loadBookingsPort) {
        this.loadBookingsPort = loadBookingsPort;
    }

    @Override
    public List<Booking> getBookings(Optional<BookingStatus> status) {
        return status
                .map(loadBookingsPort::loadByStatus)
                .orElseGet(loadBookingsPort::loadAll);
    }
}
