package com.hotel.backend.adapter.out.persistence.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringDataRoomTypeRepository extends JpaRepository<RoomTypeEntity, Long>, JpaSpecificationExecutor<RoomTypeEntity> {
    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
}
