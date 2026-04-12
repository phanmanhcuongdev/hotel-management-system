package com.hotel.backend.application.port.in;

import java.util.List;

public interface GetBookingsUseCase {
    List<BookingWithRoom> getAll(GetBookingsQuery query);
}
