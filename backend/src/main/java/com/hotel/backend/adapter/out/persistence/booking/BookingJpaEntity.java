package com.hotel.backend.adapter.out.persistence.booking;

import com.hotel.backend.adapter.out.persistence.client.ClientEntity;
import com.hotel.backend.adapter.out.persistence.room.RoomEntity;
import com.hotel.backend.adapter.out.persistence.user.UserEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", insertable = false, updatable = false)
    public RoomEntity room;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    public ClientEntity client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public UserEntity user;

    @Column(nullable = false, precision = 15, scale = 2)
    public BigDecimal discount = BigDecimal.ZERO;

    @Column(length = 500)
    public String note;
}
