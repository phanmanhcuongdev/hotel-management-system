package com.hotel.backend.adapter.out.persistence.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpringDataServiceRepository extends JpaRepository<ServiceEntity, Integer> {
    List<ServiceEntity> findAllByOrderByNameAscUnitAsc();

    boolean existsByNameIgnoreCaseAndUnitIgnoreCase(String name, String unit);

    boolean existsByNameIgnoreCaseAndUnitIgnoreCaseAndIdNot(String name, String unit, Integer id);
}
