package com.hotel.backend.application.port.in;

import java.time.LocalDate;
import java.util.Optional;

public record SearchAvailableRoomsQuery(
        LocalDate checkIn,
        LocalDate checkOut,
        Optional<String> keyword,
        Optional<Long> typeId
) {
}
