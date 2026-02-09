package com.hotel.backend.adapter.out.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class RoomJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "room_number")
    public String roomNumber;

    @Column(name = "status")
    public String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_type_id")
    public RoomTypeJpaEntity roomType;
}