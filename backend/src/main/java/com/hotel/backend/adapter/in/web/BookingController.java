package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BookingResponse;
import com.hotel.backend.adapter.in.web.dto.CreateBookingRequest;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.port.in.CreateBookingCommand;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final CreateBookingUseCase createBookingUseCase;
    private final LoadRoomPort loadRoomPort;

    public BookingController(CreateBookingUseCase createBookingUseCase, LoadRoomPort loadRoomPort) {
        this.createBookingUseCase = createBookingUseCase;
        this.loadRoomPort = loadRoomPort;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(@Valid @RequestBody CreateBookingRequest req) {
        Booking created = createBookingUseCase.create(new CreateBookingCommand(
                req.userId(), req.roomId(), req.checkIn(), req.checkOut()
        ));

        Room room = loadRoomPort.loadRoomById(req.roomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        return BookingWebMapper.toResponse(created, room);
    }
}