package com.hotel.backend.adapter.out.persistence.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringDataRoomTypeRepository extends JpaRepository<RoomTypeJpaEntity, Long> {
}
