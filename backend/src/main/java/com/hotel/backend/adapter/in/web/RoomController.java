package com.hotel.backend.adapter.in.web;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hotel.backend.adapter.in.web.dto.CreateRoomRequest;
import com.hotel.backend.adapter.in.web.dto.RoomResponse;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.in.ManagerRoomUseCase;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController{

    private final GetRoomsUseCase getRoomsUseCase;
    private final ManagerRoomUseCase managerRoomUseCase;

    @GetMapping
    public List<RoomResponse> getRooms(@RequestParam Optional<RoomStatus> status) {
        return getRoomsUseCase.getRooms(status).stream()
                .map(RoomWebMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public RoomResponse getRoomById(@PathVariable Long id) {
        var room = getRoomsUseCase.getRoomById(id);
        return RoomWebMapper.toResponse(room);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomResponse createRoom(@RequestBody @Valid CreateRoomRequest request) {
        var room = managerRoomUseCase.createRoom(
                request.roomNumber(),
                request.status(),
                request.roomTypeId()
        );
        return RoomWebMapper.toResponse(room);
    }

    @PutMapping("/{id}")
    public RoomResponse updateRoom(@PathVariable Long id, @RequestBody @Valid CreateRoomRequest request) {
        var room = managerRoomUseCase.updateRoom(
                id,
                request.roomNumber(),
                request.status(),
                request.roomTypeId()
        );
        return RoomWebMapper.toResponse(room);
    }
}
