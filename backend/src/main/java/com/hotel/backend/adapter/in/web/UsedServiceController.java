package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.AddUsedServiceRequest;
import com.hotel.backend.adapter.in.web.dto.UsedServiceResponse;
import com.hotel.backend.application.port.in.AddBookingUsedServiceCommand;
import com.hotel.backend.application.port.in.AddBookingUsedServiceUseCase;
import com.hotel.backend.application.port.in.GetBookingUsedServicesUseCase;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@WebAdapter
@RequestMapping("/api/bookings/{bookingId}/used-services")
@RequiredArgsConstructor
public class UsedServiceController {

    private final GetBookingUsedServicesUseCase getBookingUsedServicesUseCase;
    private final AddBookingUsedServiceUseCase addBookingUsedServiceUseCase;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UsedServiceResponse> getBookingUsedServices(@PathVariable Long bookingId) {
        return getBookingUsedServicesUseCase.getBookingUsedServices(bookingId).stream()
                .map(ServiceWebMapper::toResponse)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public UsedServiceResponse addUsedService(@PathVariable Long bookingId,
                                              @Valid @RequestBody AddUsedServiceRequest request) {
        return ServiceWebMapper.toResponse(addBookingUsedServiceUseCase.addUsedService(
                new AddBookingUsedServiceCommand(
                        bookingId,
                        request.serviceId(),
                        request.quantity(),
                        request.discount()
                )
        ));
    }
}
