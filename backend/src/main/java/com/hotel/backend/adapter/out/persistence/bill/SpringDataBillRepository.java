package com.hotel.backend.adapter.out.persistence.bill;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SpringDataBillRepository extends JpaRepository<BillEntity, Integer>, JpaSpecificationExecutor<BillEntity> {
    Optional<BillEntity> findByBooking_Id(Long bookingId);

    @Query("""
            select b
            from BillEntity b
            left join fetch b.booking bk
            left join fetch bk.room r
            left join fetch r.roomType
            left join fetch b.user
            where b.id = :billId
            """)
    Optional<BillEntity> findDetailById(@Param("billId") Integer billId);

    @Query("""
            select b
            from BillEntity b
            left join fetch b.booking bk
            left join fetch bk.room r
            where b.paymentDate between :startDate and :endDate
            """)
    List<BillEntity> findForReport(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
