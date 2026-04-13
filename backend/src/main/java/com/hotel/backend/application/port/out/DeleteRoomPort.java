package com.hotel.backend.application.port.out;

public interface DeleteRoomPort {
    boolean hasRelatedBookingData(Long roomId);

    void deleteRoomById(Long roomId);
}
