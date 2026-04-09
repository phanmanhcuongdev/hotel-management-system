package com.hotel.backend.adapter.out.persistence.bookedroom;

import com.hotel.backend.adapter.out.persistence.booking.BookingJpaEntity;
import com.hotel.backend.adapter.out.persistence.room.RoomEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "booked_rooms")
public class BookedRoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(nullable = false)
    public LocalDate checkin;

    @Column(nullable = false)
    public LocalDate checkout;

    @Column(nullable = false, precision = 15, scale = 2)
    public BigDecimal discount = BigDecimal.ZERO;

    @Column(name = "is_checked_in", nullable = false)
    public Boolean isCheckedIn = Boolean.FALSE;

    @Column(length = 500)
    public String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    public BookingJpaEntity booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    public RoomEntity room;
}
