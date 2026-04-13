package com.hotel.backend.application.port.in.client;

import com.hotel.backend.application.domain.model.Client;
import com.hotel.backend.application.domain.model.ClientDetails;

import java.util.List;

public interface GetClientsUseCase {
    List<Client> getClients(GetClientsQuery query);

    Client getClientById(Integer id);

    ClientDetails getClientDetails(Integer id);
}
