package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Room;

import java.util.List;

public interface SearchAvailableRoomsUseCase {
    List<Room> searchAvailableRooms(SearchAvailableRoomsQuery query);
}
