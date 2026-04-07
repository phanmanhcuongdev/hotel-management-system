package com.hotel.backend.application.port.in;

import java.time.LocalDate;

public record CreateBookingCommand(
        String guestName,
        String phoneNumber,
        String email,
        Long roomId,
        LocalDate checkIn,
        LocalDate checkOut
) {}