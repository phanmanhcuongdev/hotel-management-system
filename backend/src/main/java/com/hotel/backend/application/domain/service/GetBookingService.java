package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.out.LoadBookingPort;

import java.util.Optional;

public class GetBookingService implements GetBookingUseCase {

    private final LoadBookingPort loadBookingPort;

    public GetBookingService(LoadBookingPort loadBookingPort) {
        this.loadBookingPort = loadBookingPort;
    }

    @Override
    public Optional<Booking> getBookingById(Long id) {
        return loadBookingPort.loadById(id);
    }
}
