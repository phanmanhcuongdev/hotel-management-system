package com.hotel.backend.adapter.out.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class RoomJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "room_number", nullable = false, unique = true)
    public String roomNumber;

    @Column(name = "status", nullable = false)
    public String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_type_id", nullable = false)
    public RoomTypeJpaEntity roomType;
}
