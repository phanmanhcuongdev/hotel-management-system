package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.CreateRoomRequest;
import com.hotel.backend.adapter.in.web.dto.RoomResponse;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.port.in.GetRoomsQuery;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.in.ManagerRoomUseCase;
import com.hotel.backend.application.port.in.SearchAvailableRoomsQuery;
import com.hotel.backend.application.port.in.SearchAvailableRoomsUseCase;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

@WebAdapter
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final GetRoomsUseCase getRoomsUseCase;
    private final SearchAvailableRoomsUseCase searchAvailableRoomsUseCase;
    private final ManagerRoomUseCase managerRoomUseCase;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<RoomResponse> getRooms(@RequestParam Optional<String> keyword,
                                       @RequestParam Optional<RoomStatus> status,
                                       @RequestParam Optional<Long> typeId) {
        GetRoomsQuery query = new GetRoomsQuery(
                keyword.map(String::trim).filter(value -> !value.isBlank()),
                status,
                typeId
        );

        return getRoomsUseCase.getRooms(query).stream()
                .map(RoomWebMapper::toResponse)
                .toList();
    }

    @GetMapping("/available")
    @PreAuthorize("hasRole('ADMIN')")
    public List<RoomResponse> getAvailableRooms(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
                                                @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut,
                                                @RequestParam Optional<String> keyword,
                                                @RequestParam Optional<Long> typeId) {
        SearchAvailableRoomsQuery query = new SearchAvailableRoomsQuery(
                checkIn,
                checkOut,
                keyword.map(String::trim).filter(value -> !value.isBlank()),
                typeId
        );

        return searchAvailableRoomsUseCase.searchAvailableRooms(query).stream()
                .map(RoomWebMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public RoomResponse getRoomById(@PathVariable Long id) {
        return RoomWebMapper.toResponse(getRoomsUseCase.getRoomById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public RoomResponse createRoom(@RequestBody @Valid CreateRoomRequest request) {
        return RoomWebMapper.toResponse(managerRoomUseCase.createRoom(
                request.roomNumber(),
                request.status(),
                request.roomTypeId()
        ));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public RoomResponse updateRoom(@PathVariable Long id, @RequestBody @Valid CreateRoomRequest request) {
        return RoomWebMapper.toResponse(managerRoomUseCase.updateRoom(
                id,
                request.roomNumber(),
                request.status(),
                request.roomTypeId()
        ));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteRoom(@PathVariable Long id) {
        managerRoomUseCase.deleteRoom(id);
    }
}
