package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Client;

public interface SaveClientPort {
    Client createClient(
            String idCardNumber,
            String fullName,
            String address,
            String email,
            String phoneNumber,
            String description
    );

    Client updateClient(
            Integer id,
            String idCardNumber,
            String fullName,
            String address,
            String email,
            String phoneNumber,
            String description
    );

    Client saveAutoCreatedClient(String fullName, String normalizedPhone, String email);

    Client refreshAutoCreatedClientProfile(Integer id, String fullName, String email);
}
