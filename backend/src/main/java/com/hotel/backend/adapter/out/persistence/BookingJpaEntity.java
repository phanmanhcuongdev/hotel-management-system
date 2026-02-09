package com.hotel.backend.adapter.out.persistence;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class BookingJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "user_id")
    public Long userId;

    @Column(name = "room_id")
    public Long roomId;

    @Column(name = "check_in")
    public LocalDate checkIn;

    @Column(name = "check_out")
    public LocalDate checkOut;

    @Column(name = "status")
    public String status;
}