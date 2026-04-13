package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.UsedServiceItem;
import com.hotel.backend.application.port.in.GetBookingUsedServicesUseCase;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadUsedServicePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetBookingUsedServicesService implements GetBookingUsedServicesUseCase {

    private final LoadBookingPort loadBookingPort;
    private final LoadBookedRoomPort loadBookedRoomPort;
    private final LoadUsedServicePort loadUsedServicePort;

    @Override
    public List<UsedServiceItem> getBookingUsedServices(Long bookingId) {
        loadBookingPort.loadBookingById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        return loadBookedRoomPort.loadByBookingId(bookingId)
                .map(bookedRoom -> loadUsedServicePort.loadUsedServicesByBookedRoomId(bookedRoom.id()))
                .orElseGet(List::of);
    }
}
