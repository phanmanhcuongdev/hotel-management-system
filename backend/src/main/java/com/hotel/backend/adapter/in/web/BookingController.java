package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.CreateBookingRequest;
import com.hotel.backend.adapter.in.web.dto.UpdateBookingRequest;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.in.UpdateBookingUseCase;
import com.hotel.backend.application.port.out.LoadBookingPort;
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
    private final GetBookingsUseCase getBookingsUseCase;
    private final GetBookingUseCase getBookingUseCase;
    private final UpdateBookingUseCase updateBookingUseCase;
    private final LoadRoomPort loadRoomPort;
    private final LoadBookingPort loadBookingPort;

    public BookingController(
            CreateBookingUseCase createBookingUseCase,
            GetBookingsUseCase getBookingsUseCase,
            GetBookingUseCase getBookingUseCase,
            UpdateBookingUseCase updateBookingUseCase,
            LoadRoomPort loadRoomPort,
            LoadBookingPort loadBookingPort) {
        this.createBookingUseCase = createBookingUseCase;
        this.getBookingsUseCase = getBookingsUseCase;
        this.getBookingUseCase = getBookingUseCase;
        this.updateBookingUseCase = updateBookingUseCase;
        this.loadRoomPort = loadRoomPort;
        this.loadBookingPort = loadBookingPort;
    }

    @GetMapping
    public List<BookingResponse> getBookings(@RequestParam Optional<BookingStatus> status) {
        return getBookingsUseCase.getBookings(status).stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public BookingResponse getBooking(@PathVariable Long id) {
        Booking booking = getBookingUseCase.getBookingById(id)
                .orElseThrow(() -> new IllegalStateException("Booking not found: " + id));
        Room room = loadRoomPort.loadRoomById(booking.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found for booking"));
        return toResponse(booking, room);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest req) {
        CreateBookingCommand cmd = new CreateBookingCommand(
                req.userId(),
                req.roomId(),
                req.checkIn(),
                req.checkOut(),
                req.guestName(),
                req.phoneNumber(),
                req.email()
        );
        Booking created = createBookingUseCase.create(cmd);

        Room room = loadRoomPort.loadRoomById(created.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        return toResponse(created, room);
    }

    @PutMapping("/{id}")
    public BookingResponse updateStatus(@PathVariable Long id, @Valid @RequestBody UpdateBookingRequest req) {
        Booking updated = updateBookingUseCase.updateStatus(id, req.status());
        Room room = loadRoomPort.loadRoomById(updated.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));
        return toResponse(updated, room);
    }

    private BookingResponse toResponse(Booking booking, Room room) {
        return new BookingResponse(
                booking.id(),
                booking.userId(),
                new com.hotel.backend.adapter.in.web.dto.RoomShortResponse(
                        room.id(),
                        room.roomNumber(),
                        room.type().name()
                ),
                booking.checkIn(),
                booking.checkOut(),
                booking.status().name(),
                booking.guestName(),
                booking.phoneNumber(),
                booking.email()
        );
    }
}
