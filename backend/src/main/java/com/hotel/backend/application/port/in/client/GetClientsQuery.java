package com.hotel.backend.application.port.in.client;

import java.util.Optional;

public record GetClientsQuery(
        Optional<String> keyword,
        Optional<Boolean> needsReview
) {
}
