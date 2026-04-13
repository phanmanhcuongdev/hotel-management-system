package com.hotel.backend.application.port.in.roomtype;

import java.util.Optional;

public record GetRoomTypesQuery(
        Optional<String> keyword
) {
}
