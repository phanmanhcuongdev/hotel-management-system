package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.CreateRoomRequest;
import com.hotel.backend.adapter.in.web.dto.RoomResponse;
import com.hotel.backend.adapter.in.web.dto.UpdateRoomRequest;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomUseCase;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.in.SaveRoomUseCase;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final GetRoomsUseCase getRoomsUseCase;
    private final GetRoomUseCase getRoomUseCase;
    private final SaveRoomUseCase saveRoomUseCase;

    public RoomController(GetRoomsUseCase getRoomsUseCase, GetRoomUseCase getRoomUseCase, SaveRoomUseCase saveRoomUseCase) {
        this.getRoomsUseCase = getRoomsUseCase;
        this.getRoomUseCase = getRoomUseCase;
        this.saveRoomUseCase = saveRoomUseCase;
    }

    @GetMapping
    public List<RoomResponse> getRooms(@RequestParam Optional<RoomStatus> status) {
        return getRoomsUseCase.getRooms(status).stream()
                .map(RoomWebMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public RoomResponse getRoom(@PathVariable Long id) {
        return getRoomUseCase.getRoomById(id)
                .map(RoomWebMapper::toResponse)
                .orElseThrow(() -> new IllegalStateException("Room not found: " + id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomResponse createRoom(@RequestBody CreateRoomRequest req) {
        var room = saveRoomUseCase.create(req.roomNumber(), req.roomTypeId(), req.status());
        return RoomWebMapper.toResponse(room);
    }

    @PutMapping("/{id}")
    public RoomResponse updateRoom(@PathVariable Long id, @RequestBody UpdateRoomRequest req) {
        var room = saveRoomUseCase.update(id, req.roomNumber(), req.roomTypeId(), req.status());
        return RoomWebMapper.toResponse(room);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoom(@PathVariable Long id) {
        saveRoomUseCase.delete(id);
    }
}
