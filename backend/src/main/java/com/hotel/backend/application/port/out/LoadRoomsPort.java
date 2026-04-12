package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.GetRoomsQuery;

import java.util.List;

public interface LoadRoomsPort {
    List<Room> loadRooms(GetRoomsQuery query);
}
