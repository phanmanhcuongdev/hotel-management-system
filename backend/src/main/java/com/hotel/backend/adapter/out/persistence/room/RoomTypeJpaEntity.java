package com.hotel.backend.adapter.out.persistence.room;

import jakarta.persistence.*;

@Entity
@Table(name = "room_types")
public class RoomTypeJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;

    public java.math.BigDecimal price;

    public Integer capacity;
}
