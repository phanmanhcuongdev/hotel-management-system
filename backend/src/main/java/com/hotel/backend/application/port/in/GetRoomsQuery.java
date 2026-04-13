package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.RoomStatus;

import java.util.Optional;

public record GetRoomsQuery(
        Optional<String> keyword,
        Optional<RoomStatus> status,
        Optional<Long> typeId
) {
}
