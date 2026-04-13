package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.SearchAvailableRoomsQuery;
import com.hotel.backend.application.port.in.SearchAvailableRoomsUseCase;
import com.hotel.backend.application.port.out.LoadAvailableRoomsPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@UseCase
@RequiredArgsConstructor
public class SearchAvailableRoomsService implements SearchAvailableRoomsUseCase {

    private final LoadAvailableRoomsPort loadAvailableRoomsPort;

    @Override
    public List<Room> searchAvailableRooms(SearchAvailableRoomsQuery query) {
        validateDateRange(query.checkIn(), query.checkOut());
        return loadAvailableRoomsPort.loadAvailableRooms(query);
    }

    static void validateDateRange(LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null || checkOut == null || !checkIn.isBefore(checkOut)) {
            throw new IllegalArgumentException("checkIn must be before checkOut");
        }

        if (checkIn.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("checkIn must be today or later");
        }
    }
}
