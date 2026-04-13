package com.hotel.backend.application.port.out;

public interface DeleteClientPort {
    boolean hasBookingHistory(Integer id);

    void deleteClientById(Integer id);
}
