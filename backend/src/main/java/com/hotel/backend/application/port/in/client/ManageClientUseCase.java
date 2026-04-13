package com.hotel.backend.application.port.in.client;

import com.hotel.backend.application.domain.model.Client;

public interface ManageClientUseCase {
    Client createClient(CreateClientCommand command);

    Client updateClient(UpdateClientCommand command);

    void deleteClient(Integer id);
}
