package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.CreateBookingRequest;
import com.hotel.backend.adapter.in.web.dto.UpdateBookingStatusRequest;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.BookingWithRoom;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.in.UpdateBookingStatusUseCase;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@WebAdapter
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final CreateBookingUseCase createBookingUseCase;
    private final GetBookingUseCase getBookingUseCase;
    private final GetBookingsUseCase getBookingsUseCase;
    private final UpdateBookingStatusUseCase updateBookingStatusUseCase;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<BookingResponse> getAll(@RequestParam(required = false) String status) {
        Optional<BookingStatus> statusFilter = Optional.empty();
        if (status != null && !status.isBlank()) {
            try {
                statusFilter = Optional.of(BookingStatus.valueOf(status.toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid status value: " + status);
            }
        }
        List<BookingWithRoom> results = getBookingsUseCase.getAll(statusFilter);
        return results.stream()
                .map(bwr -> BookingWebMapper.toResponse(bwr.booking(), bwr.room()))
                .toList();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponse getById(@PathVariable Long id) {
        BookingWithRoom result = getBookingUseCase.getById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        return BookingWebMapper.toResponse(result.booking(), result.room());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest req) {
        var created = createBookingUseCase.create(new CreateBookingCommand(
                req.guestName(), req.phoneNumber(), req.email(),
                req.roomId(), req.checkIn(), req.checkOut()
        ));

        BookingWithRoom result = getBookingUseCase.getById(created.id())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found after creation"));
        return BookingWebMapper.toResponse(result.booking(), result.room());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponse updateStatus(@PathVariable Long id,
                                        @Valid @RequestBody UpdateBookingStatusRequest req) {
        BookingStatus newStatus;
        try {
            newStatus = BookingStatus.valueOf(req.status().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + req.status());
        }

        var updated = updateBookingStatusUseCase.updateStatus(id, newStatus);

        BookingWithRoom result = getBookingUseCase.getById(updated.id())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found after update"));
        return BookingWebMapper.toResponse(result.booking(), result.room());
    }
}
