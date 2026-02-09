package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.RoomResponse;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final GetRoomsUseCase getRoomsUseCase;

    public RoomController(GetRoomsUseCase getRoomsUseCase) {
        this.getRoomsUseCase = getRoomsUseCase;
    }

    @GetMapping
    public List<RoomResponse> getRooms(@RequestParam Optional<RoomStatus> status) {
        return getRoomsUseCase.getRooms(status).stream()
                .map(RoomWebMapper::toResponse)
                .toList();
    }
}