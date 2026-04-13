package com.hotel.backend.application.port.out;

public interface DeleteRoomTypePort {
    boolean hasRelatedRooms(Long roomTypeId);

    void deleteRoomTypeById(Long roomTypeId);
}
