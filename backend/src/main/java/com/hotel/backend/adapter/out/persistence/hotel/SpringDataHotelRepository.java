package com.hotel.backend.adapter.out.persistence.hotel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpringDataHotelRepository extends JpaRepository<HotelEntity, Integer> {
    Optional<HotelEntity> findFirstByOrderByIdAsc();
}
