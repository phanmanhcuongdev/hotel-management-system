package com.hotel.backend.adapter.out.persistence.room;

import com.hotel.backend.adapter.out.persistence.hotel.HotelEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "room_number", nullable = false, unique = true)
    public String roomNumber;

    @Column(name = "status", nullable = false)
    public String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_type_id", nullable = false)
    public RoomTypeEntity roomType;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "hotel_id")
    public HotelEntity hotel;
}
