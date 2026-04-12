package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.Room;
import java.util.List;

public interface GetRoomsUseCase {
    List<Room> getRooms(GetRoomsQuery query);

    Room getRoomById(Long id);
}
