package com.hotel.backend.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataRoomTypeRepository extends JpaRepository<RoomTypeJpaEntity, Long> {
    Optional<RoomTypeJpaEntity> findByName(String name);
}
