package com.hotel.backend.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpringDataBookingRepository extends JpaRepository<BookingJpaEntity, Long> {
    List<BookingJpaEntity> findAll();
    List<BookingJpaEntity> findByStatus(String status);
}
