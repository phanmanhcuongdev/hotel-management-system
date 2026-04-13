package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.SearchAvailableRoomsQuery;

import java.util.List;

public interface LoadAvailableRoomsPort {
    List<Room> loadAvailableRooms(SearchAvailableRoomsQuery query);
}
