package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.CreateRoomTypeRequest;
import com.hotel.backend.adapter.in.web.dto.RoomTypeResponse;
import com.hotel.backend.application.port.in.roomtype.CreateRoomTypeCommand;
import com.hotel.backend.application.port.in.roomtype.GetRoomTypesQuery;
import com.hotel.backend.application.port.in.roomtype.GetRoomTypesUseCase;
import com.hotel.backend.application.port.in.roomtype.ManageRoomTypeUseCase;
import com.hotel.backend.application.port.in.roomtype.UpdateRoomTypeCommand;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Optional;

@WebAdapter
@RequestMapping("/api/room-types")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class RoomTypeController {

    private final GetRoomTypesUseCase getRoomTypesUseCase;
    private final ManageRoomTypeUseCase manageRoomTypeUseCase;

    @GetMapping
    public List<RoomTypeResponse> getRoomTypes(@RequestParam Optional<String> keyword) {
        return getRoomTypesUseCase.getRoomTypes(new GetRoomTypesQuery(
                        keyword.map(String::trim).filter(value -> !value.isBlank())
                )).stream()
                .map(RoomWebMapper::toRoomTypeResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public RoomTypeResponse getRoomTypeById(@PathVariable Long id) {
        return RoomWebMapper.toRoomTypeResponse(getRoomTypesUseCase.getRoomTypeById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomTypeResponse createRoomType(@RequestBody @Valid CreateRoomTypeRequest request) {
        return RoomWebMapper.toRoomTypeResponse(manageRoomTypeUseCase.createRoomType(
                new CreateRoomTypeCommand(
                        request.name(),
                        request.description(),
                        request.price(),
                        request.capacity()
                )
        ));
    }

    @PatchMapping("/{id}")
    public RoomTypeResponse updateRoomType(@PathVariable Long id,
                                           @RequestBody @Valid CreateRoomTypeRequest request) {
        return RoomWebMapper.toRoomTypeResponse(manageRoomTypeUseCase.updateRoomType(
                new UpdateRoomTypeCommand(
                        id,
                        request.name(),
                        request.description(),
                        request.price(),
                        request.capacity()
                )
        ));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoomType(@PathVariable Long id) {
        manageRoomTypeUseCase.deleteRoomType(id);
    }
}
