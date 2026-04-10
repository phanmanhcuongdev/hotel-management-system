package com.hotel.backend.adapter.out.persistence.booking;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SpringDataBookingRepository extends JpaRepository<BookingJpaEntity, Long> {
    List<BookingJpaEntity> findByStatus(String status);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
            select b
            from BookingJpaEntity b
            where b.roomId = :roomId
              and b.status in :statuses
              and b.checkIn < :checkOut
              and b.checkOut > :checkIn
            """)
    List<BookingJpaEntity> findActiveOverlapsForUpdate(
            @Param("roomId") Long roomId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut,
            @Param("statuses") List<String> statuses
    );
}
