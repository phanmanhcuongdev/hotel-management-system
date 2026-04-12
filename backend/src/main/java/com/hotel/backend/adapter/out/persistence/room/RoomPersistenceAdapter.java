package com.hotel.backend.adapter.out.persistence.room;

import com.hotel.backend.adapter.out.persistence.bookedroom.SpringDataBookedRoomRepository;
import com.hotel.backend.adapter.out.persistence.booking.BookingJpaEntity;
import com.hotel.backend.adapter.out.persistence.booking.SpringDataBookingRepository;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.Room;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.RoomType;
import com.hotel.backend.application.port.out.DeleteRoomPort;
import com.hotel.backend.application.port.out.DeleteRoomTypePort;
import com.hotel.backend.application.port.in.GetRoomsQuery;
import com.hotel.backend.application.port.in.roomtype.GetRoomTypesQuery;
import com.hotel.backend.application.port.in.SearchAvailableRoomsQuery;
import com.hotel.backend.application.port.out.LoadAvailableRoomsPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomTypePort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import com.hotel.backend.application.port.out.SaveRoomTypePort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Subquery;
import java.util.List;
import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class RoomPersistenceAdapter implements LoadRoomsPort, LoadRoomPort, SaveRoomPort, LoadRoomTypePort, SaveRoomTypePort, LoadAvailableRoomsPort, DeleteRoomPort, DeleteRoomTypePort {

    private static final List<String> ACTIVE_BOOKING_STATUSES = List.of(
            BookingStatus.PENDING.name(),
            BookingStatus.CONFIRMED.name()
    );

    private final SpringDataRoomRepository roomRepo;
    private final SpringDataRoomTypeRepository roomTypeRepo;
    private final SpringDataBookingRepository bookingRepository;
    private final SpringDataBookedRoomRepository bookedRoomRepository;

    @Override
    public List<Room> loadRooms(GetRoomsQuery query) {
        return roomRepo.findAll(buildRoomSpecification(query)).stream()
                .map(RoomMapper::toDomain)
                .toList();
    }

    @Override
    public Optional<Room> loadRoomById(Long roomId) {
        return roomRepo.findById(roomId).map(RoomMapper::toDomain);
    }

    @Override
    public Room saveRoom(Room room) {
        RoomEntity entity;
        if (room.id() != null) {
            entity = roomRepo.findById(room.id()).orElseGet(RoomEntity::new);
        } else {
            entity = new RoomEntity();
        }

        entity.id = room.id();
        entity.roomNumber = room.roomNumber();
        entity.status = room.status().name();

        if (room.type() != null && room.type().id() != null) {
            entity.roomType = roomTypeRepo.getReferenceById(room.type().id());
        }

        return RoomMapper.toDomain(roomRepo.save(entity));
    }

    @Override
    public Optional<RoomType> loadRoomTypeById(Long id) {
        return roomTypeRepo.findById(id).map(RoomMapper::toDomain);
    }

    @Override
    public List<RoomType> loadRoomTypes(GetRoomTypesQuery query) {
        return roomTypeRepo.findAll(buildRoomTypeSpecification(query)).stream()
                .map(RoomMapper::toDomain)
                .toList();
    }

    @Override
    public RoomType saveRoomType(RoomType roomType) {
        RoomTypeEntity entity;
        if (roomType.id() != null) {
            entity = roomTypeRepo.findById(roomType.id()).orElseGet(RoomTypeEntity::new);
        } else {
            entity = new RoomTypeEntity();
        }

        entity.id = roomType.id();
        entity.name = roomType.name();
        entity.description = roomType.description();
        entity.price = roomType.price();
        entity.capacity = roomType.capacity();

        return RoomMapper.toDomain(roomTypeRepo.save(entity));
    }

    @Override
    public List<Room> loadAvailableRooms(SearchAvailableRoomsQuery query) {
        return roomRepo.findAll(buildAvailableRoomSpecification(query)).stream()
                .map(RoomMapper::toDomain)
                .toList();
    }

    @Override
    public boolean existsByRoomNumber(String roomNumber) {
        return roomRepo.existsByRoomNumber(roomNumber);
    }

    @Override
    public boolean existsByRoomNumberAndIdNot(String roomNumber, Long id) {
        return roomRepo.existsByRoomNumberAndIdNot(roomNumber, id);
    }

    @Override
    public boolean hasRelatedBookingData(Long roomId) {
        return bookingRepository.existsByRoomId(roomId) || bookedRoomRepository.existsByRoom_Id(roomId);
    }

    @Override
    public void deleteRoomById(Long roomId) {
        roomRepo.deleteById(roomId);
    }

    @Override
    public boolean existsByName(String name) {
        return roomTypeRepo.existsByNameIgnoreCase(name);
    }

    @Override
    public boolean existsByNameAndIdNot(String name, Long id) {
        return roomTypeRepo.existsByNameIgnoreCaseAndIdNot(name, id);
    }

    @Override
    public boolean hasRelatedRooms(Long roomTypeId) {
        return roomRepo.existsByRoomType_Id(roomTypeId);
    }

    @Override
    public void deleteRoomTypeById(Long roomTypeId) {
        roomTypeRepo.deleteById(roomTypeId);
    }

    private Specification<RoomEntity> buildRoomSpecification(GetRoomsQuery query) {
        Specification<RoomEntity> specification = (root, ignoredQuery, cb) -> cb.conjunction();

        if (query.status().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.equal(root.get("status"), query.status().get().name()));
        }

        if (query.typeId().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.equal(root.get("roomType").get("id"), query.typeId().get()));
        }

        if (query.keyword().isPresent() && !query.keyword().get().isBlank()) {
            String normalizedKeyword = "%" + query.keyword().get().trim().toLowerCase() + "%";
            specification = specification.and((root, ignoredQuery, cb) -> cb.or(
                    cb.like(cb.lower(root.get("roomNumber")), normalizedKeyword),
                    cb.like(cb.lower(root.get("roomType").get("name")), normalizedKeyword)
            ));
        }

        return specification;
    }

    private Specification<RoomEntity> buildAvailableRoomSpecification(SearchAvailableRoomsQuery query) {
        Specification<RoomEntity> specification = (root, criteriaQuery, cb) -> {
            Subquery<Long> overlappingBookings = criteriaQuery.subquery(Long.class);
            var bookingRoot = overlappingBookings.from(BookingJpaEntity.class);

            overlappingBookings.select(bookingRoot.get("roomId"))
                    .where(
                            cb.equal(bookingRoot.get("roomId"), root.get("id")),
                            bookingRoot.get("status").in(ACTIVE_BOOKING_STATUSES),
                            cb.lessThan(bookingRoot.get("checkIn"), query.checkOut()),
                            cb.greaterThan(bookingRoot.get("checkOut"), query.checkIn())
                    );

            return cb.and(
                    cb.notEqual(root.get("status"), RoomStatus.MAINTENANCE.name()),
                    cb.not(root.get("id").in(overlappingBookings))
            );
        };

        if (query.typeId().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.equal(root.get("roomType").get("id"), query.typeId().get()));
        }

        if (query.keyword().isPresent() && !query.keyword().get().isBlank()) {
            String normalizedKeyword = "%" + query.keyword().get().trim().toLowerCase() + "%";
            specification = specification.and((root, ignoredQuery, cb) -> cb.or(
                    cb.like(cb.lower(root.get("roomNumber")), normalizedKeyword),
                    cb.like(cb.lower(root.get("roomType").get("name")), normalizedKeyword)
            ));
        }

        return specification;
    }

    private Specification<RoomTypeEntity> buildRoomTypeSpecification(GetRoomTypesQuery query) {
        Specification<RoomTypeEntity> specification = (root, ignoredQuery, cb) -> cb.conjunction();

        if (query.keyword().isPresent()) {
            String normalizedKeyword = "%" + query.keyword().get().trim().toLowerCase() + "%";
            specification = specification.and((root, ignoredQuery, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), normalizedKeyword),
                    cb.like(cb.lower(cb.coalesce(root.get("description"), "")), normalizedKeyword)
            ));
        }

        return specification;
    }
}
