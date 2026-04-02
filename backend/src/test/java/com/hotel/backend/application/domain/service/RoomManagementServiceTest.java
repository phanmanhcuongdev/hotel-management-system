package com.hotel.backend.application.domain.service;

import com.hotel.backend.adapter.out.persistence.SpringDataRoomRepository;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RoomManagementServiceTest {

    @Mock
    private SaveRoomPort saveRoomPort;

    @Mock
    private LoadRoomPort loadRoomPort;

    @Mock
    private LoadRoomTypePort loadRoomTypePort;

    @Mock
    private SpringDataRoomRepository roomRepo;

    @InjectMocks
    private RoomManagementService roomManagementService;

    private RoomType roomType;

    @BeforeEach
    void setUp() {
        roomType = new RoomType(1L, "Standard", new BigDecimal("100"), 2);
    }

    @Test
    void createRoom_success() {
        when(roomRepo.existsByRoomNumber("101")).thenReturn(false);
        when(loadRoomTypePort.loadRoomTypeById(1L)).thenReturn(Optional.of(roomType));
        when(saveRoomPort.saveRoom(any(Room.class))).thenAnswer(i -> i.getArgument(0));

        Room room = roomManagementService.createRoom("101", "AVAILABLE", 1L);

        assertNotNull(room);
        assertEquals("101", room.roomNumber());
        assertEquals(RoomStatus.AVAILABLE, room.status());
        assertEquals(roomType, room.type());
        verify(saveRoomPort).saveRoom(any(Room.class));
    }

    @Test
    void createRoom_duplicateRoomNumber_throwsException() {
        when(roomRepo.existsByRoomNumber("101")).thenReturn(true);

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
            roomManagementService.createRoom("101", "AVAILABLE", 1L)
        );

        assertTrue(exception.getMessage().contains("Số phòng đã tồn tại"));
        verify(saveRoomPort, never()).saveRoom(any());
    }

    @Test
    void createRoom_roomTypeNotFound_throwsException() {
        when(roomRepo.existsByRoomNumber("101")).thenReturn(false);
        when(loadRoomTypePort.loadRoomTypeById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
            roomManagementService.createRoom("101", "AVAILABLE", 1L)
        );
    }

    @Test
    void updateRoom_success() {
        Room existingRoom = new Room(1L, "101", RoomStatus.MAINTENANCE, roomType);
        when(roomRepo.existsByRoomNumberAndIdNot("102", 1L)).thenReturn(false);
        when(loadRoomPort.loadRoomById(1L)).thenReturn(Optional.of(existingRoom));
        when(loadRoomTypePort.loadRoomTypeById(2L)).thenReturn(Optional.of(roomType));
        when(saveRoomPort.saveRoom(any(Room.class))).thenAnswer(i -> i.getArgument(0));

        Room room = roomManagementService.updateRoom(1L, "102", "AVAILABLE", 2L);

        assertEquals(1L, room.id());
        assertEquals("102", room.roomNumber());
        assertEquals(RoomStatus.AVAILABLE, room.status());
    }
}
