package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.Room;

public record BookingWithRoom(Booking booking, Room room) {}
