package com.hotel.backend.adapter.out.persistence.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpringDataRoomRepository extends JpaRepository<RoomEntity, Long>, JpaSpecificationExecutor<RoomEntity> {
    List<RoomEntity> findByStatus(String status);

    boolean existsByRoomNumber(String roomNumber);

    boolean existsByRoomNumberAndIdNot(String roomNumber, Long id);

    boolean existsByRoomType_Id(Long roomTypeId);
}
