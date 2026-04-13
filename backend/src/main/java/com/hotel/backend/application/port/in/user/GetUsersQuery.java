package com.hotel.backend.application.port.in.user;

import java.util.Optional;

public record GetUsersQuery(Optional<String> keyword) {
}
