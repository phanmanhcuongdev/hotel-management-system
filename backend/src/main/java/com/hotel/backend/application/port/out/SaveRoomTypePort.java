package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.RoomType;

public interface SaveRoomTypePort {
    RoomType saveRoomType(RoomType roomType);
}
