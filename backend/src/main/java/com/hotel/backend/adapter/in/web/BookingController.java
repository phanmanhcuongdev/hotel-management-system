package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.CreateBookingRequest;
import com.hotel.backend.adapter.in.web.dto.UpdateBookingStatusRequest;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.in.UpdateBookingStatusUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final CreateBookingUseCase createBookingUseCase;
    private final GetBookingUseCase getBookingUseCase;
    private final GetBookingsUseCase getBookingsUseCase;
    private final UpdateBookingStatusUseCase updateBookingStatusUseCase;
    private final LoadRoomPort loadRoomPort;

    public BookingController(
            CreateBookingUseCase createBookingUseCase,
            GetBookingUseCase getBookingUseCase,
            GetBookingsUseCase getBookingsUseCase,
            UpdateBookingStatusUseCase updateBookingStatusUseCase,
            LoadRoomPort loadRoomPort) {
        this.createBookingUseCase = createBookingUseCase;
        this.getBookingUseCase = getBookingUseCase;
        this.getBookingsUseCase = getBookingsUseCase;
        this.updateBookingStatusUseCase = updateBookingStatusUseCase;
        this.loadRoomPort = loadRoomPort;
    }

    @GetMapping
    public List<BookingResponse> getAll(@RequestParam(required = false) String status) {
        Optional<BookingStatus> statusFilter = Optional.empty();
        if (status != null && !status.isBlank()) {
            try {
                statusFilter = Optional.of(BookingStatus.valueOf(status.toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid status value: " + status);
            }
        }
        List<Booking> bookings = getBookingsUseCase.getAll(statusFilter);
        return bookings.stream()
                .map(b -> {
                    Room room = loadRoomPort.loadRoomById(b.roomId()).orElse(null);
                    return room != null ? BookingWebMapper.toResponse(b, room) : null;
                })
                .filter(r -> r != null)
                .toList();
    }

    @GetMapping("/{id}")
    public BookingResponse getById(@PathVariable Long id) {
        Booking booking = getBookingUseCase.getById(id)
                .orElseThrow(() -> new IllegalStateException("Booking not found"));

        Room room = loadRoomPort.loadRoomById(booking.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        return BookingWebMapper.toResponse(booking, room);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest req) {
        Booking created = createBookingUseCase.create(new CreateBookingCommand(
                req.guestName(), req.phoneNumber(), req.email(),
                req.roomId(), req.checkIn(), req.checkOut()
        ));

        Room room = loadRoomPort.loadRoomById(req.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        return BookingWebMapper.toResponse(created, room);
    }

    @PatchMapping("/{id}/status")
    public BookingResponse updateStatus(@PathVariable Long id,
                                        @Valid @RequestBody UpdateBookingStatusRequest req) {
        BookingStatus newStatus;
        try {
            newStatus = BookingStatus.valueOf(req.status().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + req.status());
        }

        Booking updated = updateBookingStatusUseCase.updateStatus(id, newStatus);

        Room room = loadRoomPort.loadRoomById(updated.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        return BookingWebMapper.toResponse(updated, room);
    }
}