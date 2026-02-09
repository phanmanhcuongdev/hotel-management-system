package com.hotel.backend.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataBookingRepository extends JpaRepository<BookingJpaEntity, Long> {}