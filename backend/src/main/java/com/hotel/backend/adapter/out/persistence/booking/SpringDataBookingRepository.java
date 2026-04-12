package com.hotel.backend.adapter.out.persistence.booking;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SpringDataBookingRepository extends JpaRepository<BookingJpaEntity, Long>, JpaSpecificationExecutor<BookingJpaEntity> {
    @Override
    @EntityGraph(attributePaths = {"room", "room.roomType", "user", "client"})
    List<BookingJpaEntity> findAll(org.springframework.data.jpa.domain.Specification<BookingJpaEntity> spec);

    List<BookingJpaEntity> findByStatus(String status);

    boolean existsByRoomId(Long roomId);

    @Query("""
            select b
            from BookingJpaEntity b
            left join fetch b.room r
            left join fetch r.roomType
            left join fetch b.user
            left join fetch b.client
            where b.id = :bookingId
            """)
    Optional<BookingJpaEntity> findDetailById(@Param("bookingId") Long bookingId);

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

    @Query("""
            select b
            from BookingJpaEntity b
            left join fetch b.room r
            where b.status in :statuses
              and b.checkIn < :endExclusive
              and b.checkOut > :startDate
            """)
    List<BookingJpaEntity> findForReport(
            @Param("startDate") LocalDate startDate,
            @Param("endExclusive") LocalDate endExclusive,
            @Param("statuses") List<String> statuses
    );

    @Query("""
            select b
            from BookingJpaEntity b
            left join fetch b.room r
            where b.client.id = :clientId
            order by b.checkIn desc, b.id desc
            """)
    List<BookingJpaEntity> findByClientIdOrderByCheckInDesc(@Param("clientId") Integer clientId);

    boolean existsByClient_Id(Integer clientId);

    @Query("""
            select br.isCheckedIn
            from BookedRoomEntity br
            where br.booking.id = :bookingId
            """)
    Optional<Boolean> findBookedRoomCheckedInByBookingId(@Param("bookingId") Long bookingId);
}
