package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.HotelProfileResponse;
import com.hotel.backend.adapter.in.web.dto.UpdateHotelProfileRequest;
import com.hotel.backend.application.port.in.GetHotelProfileUseCase;
import com.hotel.backend.application.port.in.UpdateHotelProfileCommand;
import com.hotel.backend.application.port.in.UpdateHotelProfileUseCase;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@WebAdapter
@RequestMapping("/api/property")
@RequiredArgsConstructor
public class HotelController {

    private final GetHotelProfileUseCase getHotelProfileUseCase;
    private final UpdateHotelProfileUseCase updateHotelProfileUseCase;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public HotelProfileResponse getPropertyProfile() {
        return HotelWebMapper.toResponse(getHotelProfileUseCase.getProfile());
    }

    @PatchMapping
    @PreAuthorize("hasRole('ADMIN')")
    public HotelProfileResponse updatePropertyProfile(@Valid @RequestBody UpdateHotelProfileRequest request) {
        return HotelWebMapper.toResponse(updateHotelProfileUseCase.updateProfile(new UpdateHotelProfileCommand(
                request.name(),
                request.starLevel(),
                request.address(),
                request.description()
        )));
    }
}
