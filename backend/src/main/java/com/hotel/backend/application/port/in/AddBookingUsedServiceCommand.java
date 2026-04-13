package com.hotel.backend.application.port.in;

import java.math.BigDecimal;

public record AddBookingUsedServiceCommand(
        Long bookingId,
        Integer serviceId,
        Integer quantity,
        BigDecimal discount
) {
}
