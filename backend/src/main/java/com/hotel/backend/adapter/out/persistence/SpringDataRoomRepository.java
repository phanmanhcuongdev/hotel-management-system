package com.hotel.backend.adapter.out.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringDataRoomRepository extends JpaRepository<RoomJpaEntity, Long> {
    List<RoomJpaEntity> findByStatus(String status);
    //Validate
    boolean existsByRoomNumber(String roomNumber);
    boolean existsByRoomNumberAndIdNot(String roomNumber, Long id);
}
