package com.hotel.backend.adapter.out.persistence.service;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "services")
public class ServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String unit;

    @Column(nullable = false, precision = 15, scale = 2)
    public BigDecimal price;
}
