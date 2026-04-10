package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.in.ManagerRoomUseCase;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomManagementService implements ManagerRoomUseCase {

    private static final List<BookingStatus> ACTIVE_BOOKING_STATUSES = List.of(
            BookingStatus.PENDING,
            BookingStatus.CONFIRMED
    );

    private final SaveRoomPort saveRoomPort;
    private final LoadRoomPort loadRoomPort;
    private final LoadRoomTypePort loadRoomTypePort;
    private final LoadBookingsPort loadBookingsPort;

    @Override
    public Room createRoom(String roomNumber, RoomStatus status, Long roomTypeId) {
        if (loadRoomPort.existsByRoomNumber(roomNumber)) {
            throw new IllegalArgumentException("Số phòng đã tồn tại: " + roomNumber);
        }

        RoomType roomType = loadRoomTypePort.loadRoomTypeById(roomTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng"));

        Room room = new Room(null, roomNumber, status, roomType);
        return saveRoomPort.saveRoom(room);
    }

    @Override
    public Room updateRoom(Long id, String roomNumber, RoomStatus status, Long roomTypeId) {
        if (loadRoomPort.existsByRoomNumberAndIdNot(roomNumber, id)) {
            throw new IllegalArgumentException("Số phòng đã tồn tại: " + roomNumber);
        }

        Room existingRoom = loadRoomPort.loadRoomById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phòng"));

        if ((status == RoomStatus.AVAILABLE || status == RoomStatus.MAINTENANCE) && hasActiveBooking(id)) {
            throw new BusinessConflictException("Không thể chuyển trạng thái phòng khi đang có booking hiệu lực");
        }

        RoomType roomType = loadRoomTypePort.loadRoomTypeById(roomTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy loại phòng"));

        Room room = new Room(existingRoom.id(), roomNumber, status, roomType);
        return saveRoomPort.saveRoom(room);
    }

    private boolean hasActiveBooking(Long roomId) {
        LocalDate today = LocalDate.now();

        return loadBookingsPort.loadBookings(Optional.empty()).stream()
                .filter(booking -> booking.roomId().equals(roomId))
                .filter(booking -> ACTIVE_BOOKING_STATUSES.contains(booking.status()))
                .anyMatch(booking -> booking.checkOut().isAfter(today));
    }
}
