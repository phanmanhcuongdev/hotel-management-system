package com.hotel.backend.adapter.out.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringDataRoomTypeRepository extends JpaRepository<RoomTypeJpaEntity, Long> {
    Optional<RoomTypeJpaEntity> findById(Long id);
}
