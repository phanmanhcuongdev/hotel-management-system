package com.hotel.backend.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpringDataRoomRepository extends JpaRepository<RoomJpaEntity, Long> {
    List<RoomJpaEntity> findByStatus(String status);
}