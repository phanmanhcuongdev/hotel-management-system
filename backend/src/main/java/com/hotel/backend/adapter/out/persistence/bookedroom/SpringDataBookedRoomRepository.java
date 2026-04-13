package com.hotel.backend.adapter.out.persistence.bookedroom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SpringDataBookedRoomRepository extends JpaRepository<BookedRoomEntity, Integer> {
    Optional<BookedRoomEntity> findFirstByBooking_IdOrderByIdAsc(Long bookingId);

    boolean existsByRoom_Id(Long roomId);

    @Query("""
            select br
            from BookedRoomEntity br
            left join fetch br.room r
            left join fetch br.booking b
            where b.status in :statuses
              and br.checkin < :endExclusive
              and br.checkout > :startDate
            """)
    List<BookedRoomEntity> findForReport(
            @Param("startDate") LocalDate startDate,
            @Param("endExclusive") LocalDate endExclusive,
            @Param("statuses") List<String> statuses
    );
}
