package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.HotelProfile;
import com.hotel.backend.application.port.in.GetHotelProfileUseCase;
import com.hotel.backend.application.port.out.LoadHotelProfilePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

@UseCase
@RequiredArgsConstructor
public class GetHotelProfileService implements GetHotelProfileUseCase {

    private final LoadHotelProfilePort loadHotelProfilePort;

    @Override
    public HotelProfile getProfile() {
        return loadHotelProfilePort.loadCurrentHotel()
                .orElseThrow(() -> new ResourceNotFoundException("Hotel profile not found"));
    }
}
