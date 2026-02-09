package com.hotel.backend.application.port.in;

import java.time.LocalDate;

public record CreateBookingCommand(
        Long userId,
        Long roomId,
        LocalDate checkIn,
        LocalDate checkOut
) {}