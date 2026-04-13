package com.hotel.backend.application.domain.model;

import java.util.List;

public record ClientDetails(
        Client client,
        List<ClientBookingHistoryItem> bookingHistory
) {
}
