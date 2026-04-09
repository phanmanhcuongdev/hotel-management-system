package com.hotel.backend.adapter.out.persistence.usedservice;

import com.hotel.backend.adapter.out.persistence.bookedroom.BookedRoomEntity;
import com.hotel.backend.adapter.out.persistence.service.ServiceEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "used_services")
public class UsedServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(nullable = false)
    public Integer quantity;

    @Column(nullable = false, precision = 15, scale = 2)
    public BigDecimal discount = BigDecimal.ZERO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    public ServiceEntity service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booked_room_id", nullable = false)
    public BookedRoomEntity bookedRoom;
}
