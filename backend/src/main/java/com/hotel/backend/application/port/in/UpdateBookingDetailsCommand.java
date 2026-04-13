package com.hotel.backend.application.port.in;

import java.math.BigDecimal;

public record UpdateBookingDetailsCommand(
        Long bookingId,
        BigDecimal discount,
        String note
) {}
