package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.Client;
import com.hotel.backend.application.domain.model.ClientDetails;
import com.hotel.backend.application.port.in.client.GetClientsQuery;

import java.util.List;
import java.util.Optional;

public interface LoadClientPort {
    Optional<Client> loadByNormalizedPhone(String normalizedPhone);

    List<Client> loadClients(GetClientsQuery query);

    Optional<Client> loadClientById(Integer id);

    Optional<ClientDetails> loadClientDetailsById(Integer id);

    boolean existsByIdCardNumber(String idCardNumber);

    boolean existsByIdCardNumberAndIdNot(String idCardNumber, Integer id);

    boolean existsByNormalizedPhone(String normalizedPhone);

    boolean existsByNormalizedPhoneAndIdNot(String normalizedPhone, Integer id);
}
