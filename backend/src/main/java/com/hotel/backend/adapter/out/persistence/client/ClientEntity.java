package com.hotel.backend.adapter.out.persistence.client;

import jakarta.persistence.*;

@Entity
@Table(name = "clients")
public class ClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Column(name = "id_card_number", nullable = false, unique = true)
    public String idCardNumber;

    @Column(name = "full_name", nullable = false)
    public String fullName;

    @Column(nullable = false)
    public String address;

    @Column(length = 255)
    public String email;

    @Column(length = 15)
    public String phone;

    @Column(length = 255)
    public String description;
}
