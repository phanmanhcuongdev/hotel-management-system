package com.hotel.backend.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpringDataRoomRepository extends JpaRepository<RoomJpaEntity, Long> {
    List<RoomJpaEntity> findByStatus(String status);
    Optional<RoomJpaEntity> findByRoomNumber(String roomNumber);
    boolean existsByRoomNumber(String roomNumber);
}