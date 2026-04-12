package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.CreateBookingRequest;
import com.hotel.backend.adapter.in.web.dto.UpdateBookingDetailsRequest;
import com.hotel.backend.adapter.in.web.dto.UpdateBookingStatusRequest;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.BookingWithRoom;
import com.hotel.backend.application.port.in.CheckInBookingUseCase;
import com.hotel.backend.application.port.in.CheckOutBookingUseCase;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingsQuery;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.in.UpdateBookingStatusUseCase;
import com.hotel.backend.application.port.in.UpdateBookingDetailsCommand;
import com.hotel.backend.application.port.in.UpdateBookingDetailsUseCase;
import com.hotel.backend.application.port.out.LoadBookedRoomPort;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    private final UpdateBookingDetailsUseCase updateBookingDetailsUseCase;
    private final CheckInBookingUseCase checkInBookingUseCase;
    private final CheckOutBookingUseCase checkOutBookingUseCase;
    private final LoadBookedRoomPort loadBookedRoomPort;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<BookingResponse> getAll(@RequestParam Optional<String> keyword,
                                        @RequestParam Optional<String> status,
                                        @RequestParam Optional<Long> roomId,
                                        @RequestParam Optional<String> guestName,
                                        @RequestParam Optional<String> phoneNumber,
                                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
                                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        GetBookingsQuery query = new GetBookingsQuery(
                keyword.map(String::trim).filter(value -> !value.isBlank()),
                parseStatus(status),
                roomId,
                guestName.map(String::trim).filter(value -> !value.isBlank()),
                phoneNumber.map(String::trim).filter(value -> !value.isBlank()),
                Optional.ofNullable(checkInDate),
                Optional.ofNullable(checkOutDate)
        );

        List<BookingWithRoom> results = getBookingsUseCase.getAll(query);
        return results.stream()
                .map(bwr -> BookingWebMapper.toResponse(
                        bwr.booking(),
                        bwr.room(),
                        loadBookedRoomPort.loadByBookingId(bwr.booking().id()).map(com.hotel.backend.application.domain.model.BookedRoom::checkedIn).orElse(false)
                ))
                .toList();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponse getById(@PathVariable Long id) {
        BookingWithRoom result = getBookingUseCase.getById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        return toResponse(result);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest req, Authentication authentication) {
        var created = createBookingUseCase.create(new CreateBookingCommand(
                req.guestName(), req.phoneNumber(), req.email(),
                req.roomId(), req.checkIn(), req.checkOut(),
                req.discount(), req.note(), authentication.getName()
        ));

        BookingWithRoom result = getBookingUseCase.getById(created.id())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found after creation"));
        return toResponse(result);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponse updateDetails(@PathVariable Long id,
                                         @Valid @RequestBody UpdateBookingDetailsRequest req) {
        var updated = updateBookingDetailsUseCase.updateDetails(new UpdateBookingDetailsCommand(
                id,
                req.discount(),
                req.note()
        ));

        BookingWithRoom result = getBookingUseCase.getById(updated.id())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found after update"));
        return toResponse(result);
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
        return toResponse(result);
    }

    @PostMapping("/{id}/check-in")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponse checkIn(@PathVariable Long id) {
        var checkedIn = checkInBookingUseCase.checkIn(id);

        BookingWithRoom result = getBookingUseCase.getById(checkedIn.id())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found after check-in"));
        return toResponse(result);
    }

    @PostMapping("/{id}/checkout")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponse checkOut(@PathVariable Long id) {
        var checkedOut = checkOutBookingUseCase.checkOut(id);

        BookingWithRoom result = getBookingUseCase.getById(checkedOut.id())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found after checkout"));
        return toResponse(result);
    }

    private Optional<BookingStatus> parseStatus(Optional<String> status) {
        if (status.isEmpty() || status.get().isBlank()) {
            return Optional.empty();
        }

        try {
            return Optional.of(BookingStatus.valueOf(status.get().trim().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + status.get());
        }
    }

    private BookingResponse toResponse(BookingWithRoom result) {
        boolean checkedIn = loadBookedRoomPort.loadByBookingId(result.booking().id())
                .map(com.hotel.backend.application.domain.model.BookedRoom::checkedIn)
                .orElse(false);
        return BookingWebMapper.toResponse(result.booking(), result.room(), checkedIn);
    }
}
