package com.hotel.backend.adapter.out.persistence.bill;

import com.hotel.backend.adapter.out.persistence.booking.BookingJpaEntity;
import com.hotel.backend.adapter.out.persistence.user.UserEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "bills")
public class BillEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "payment_date", nullable = false)
    public LocalDate paymentDate;

    @Column(name = "payment_amount", nullable = false, precision = 15, scale = 2)
    public BigDecimal paymentAmount;

    @Column(name = "payment_type", nullable = false)
    public Integer paymentType;

    @Column(length = 500)
    public String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    public BookingJpaEntity booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    public UserEntity user;
}
