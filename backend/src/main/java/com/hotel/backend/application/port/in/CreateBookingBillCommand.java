package com.hotel.backend.application.port.in;

public record CreateBookingBillCommand(
        Long bookingId,
        String paymentType,
        String note,
        String actorUsername
) {
}
