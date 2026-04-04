package com.hotel.backend.adapter.out.persistence;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class BookingJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "guest_name", nullable = false)
    public String guestName;

    @Column(name = "phone_number", nullable = false)
    public String phoneNumber;

    @Column(name = "email")
    public String email;

    @Column(name = "room_id", nullable = false)
    public Long roomId;

    @Column(name = "check_in", nullable = false)
    public LocalDate checkIn;

    @Column(name = "check_out", nullable = false)
    public LocalDate checkOut;

    @Column(name = "status", nullable = false)
    public String status;

    @Column(name = "created_at", nullable = false, updatable = false)
    public LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    public LocalDateTime updatedAt;
}