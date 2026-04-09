package com.hotel.backend.adapter.out.persistence.room;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "room_types")
public class RoomTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false)
    public String name;

    @Column(length = 500)
    public String description;

    @Column(nullable = false, precision = 19, scale = 2)
    public BigDecimal price;

    @Column(name = "capacity")
    public Integer capacity;
}
