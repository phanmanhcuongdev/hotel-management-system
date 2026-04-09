package com.hotel.backend.adapter.out.persistence.hotel;

import jakarta.persistence.*;

@Entity
@Table(name = "hotels")
public class HotelEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(nullable = false)
    public String name;

    @Column(name = "star_level", nullable = false)
    public Integer starLevel;

    @Column(nullable = false)
    public String address;

    @Column(length = 500)
    public String description;
}
