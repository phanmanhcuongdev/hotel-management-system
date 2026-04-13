package com.hotel.backend.adapter.out.persistence.usedservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpringDataUsedServiceRepository extends JpaRepository<UsedServiceEntity, Integer> {
    @Query("""
            select us
            from UsedServiceEntity us
            join fetch us.service
            where us.bookedRoom.id = :bookedRoomId
            """)
    List<UsedServiceEntity> findByBookedRoom_Id(@Param("bookedRoomId") Integer bookedRoomId);

    boolean existsByService_Id(Integer serviceId);
}
