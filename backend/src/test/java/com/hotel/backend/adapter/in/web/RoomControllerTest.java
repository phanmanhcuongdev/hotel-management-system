package com.hotel.backend.adapter.in.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotel.backend.adapter.in.web.dto.CreateRoomRequest;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.in.ManagerRoomUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest({RoomController.class, GlobalExceptionHandler.class})
public class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private GetRoomsUseCase getRoomsUseCase;

    @MockBean
    private ManagerRoomUseCase managerRoomUseCase;

    private Room room;

    @BeforeEach
    void setUp() {
        RoomType roomType = new RoomType(1L, "Standard", new BigDecimal("100"), 2);
        room = new Room(1L, "101", RoomStatus.AVAILABLE, roomType);
    }

    @Test
    void getRooms_shouldReturnList() throws Exception {
        when(getRoomsUseCase.getRooms(any())).thenReturn(List.of(room));

        mockMvc.perform(get("/api/rooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].roomNumber").value("101"));
    }

    @Test
    void getRoomById_shouldReturnRoom() throws Exception {
        when(getRoomsUseCase.getRoomById(1L)).thenReturn(room);

        mockMvc.perform(get("/api/rooms/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void getRoomById_notFound_shouldReturn404() throws Exception {
        when(getRoomsUseCase.getRoomById(99L)).thenThrow(new ResourceNotFoundException("Not found"));

        mockMvc.perform(get("/api/rooms/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("NOT_FOUND"));
    }

    @Test
    void createRoom_withValidRequest_shouldReturn200() throws Exception {
        CreateRoomRequest request = new CreateRoomRequest("101", 1L, "AVAILABLE");
        when(managerRoomUseCase.createRoom(eq("101"), eq("AVAILABLE"), eq(1L))).thenReturn(room);

        mockMvc.perform(post("/api/rooms")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.roomNumber").value("101"));
    }

    @Test
    void createRoom_withInvalidRequest_shouldReturn400() throws Exception {
        CreateRoomRequest request = new CreateRoomRequest("", null, "");

        mockMvc.perform(post("/api/rooms")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }
}
