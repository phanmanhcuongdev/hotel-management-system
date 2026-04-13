package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.HotelProfile;
import com.hotel.backend.application.port.in.UpdateHotelProfileCommand;
import com.hotel.backend.application.port.in.UpdateHotelProfileUseCase;
import com.hotel.backend.application.port.out.LoadHotelProfilePort;
import com.hotel.backend.application.port.out.SaveHotelProfilePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@RequiredArgsConstructor
public class UpdateHotelProfileService implements UpdateHotelProfileUseCase {

    private final LoadHotelProfilePort loadHotelProfilePort;
    private final SaveHotelProfilePort saveHotelProfilePort;

    @Override
    @Transactional
    public HotelProfile updateProfile(UpdateHotelProfileCommand command) {
        HotelProfile current = loadHotelProfilePort.loadCurrentHotel()
                .orElseThrow(() -> new ResourceNotFoundException("Hotel profile not found"));

        return saveHotelProfilePort.saveHotel(new HotelProfile(
                current.id(),
                normalizeRequired(command.name(), "name"),
                validateStarLevel(command.starLevel()),
                normalizeRequired(command.address(), "address"),
                normalizeDescription(command.description())
        ));
    }

    private String normalizeRequired(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " is required");
        }
        return value.trim();
    }

    private Integer validateStarLevel(Integer starLevel) {
        if (starLevel == null || starLevel < 1 || starLevel > 5) {
            throw new IllegalArgumentException("starLevel must be between 1 and 5");
        }
        return starLevel;
    }

    private String normalizeDescription(String description) {
        if (description == null || description.isBlank()) {
            return null;
        }
        return description.trim();
    }
}
