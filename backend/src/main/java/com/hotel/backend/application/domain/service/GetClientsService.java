package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.Client;
import com.hotel.backend.application.domain.model.ClientDetails;
import com.hotel.backend.application.port.in.client.GetClientsQuery;
import com.hotel.backend.application.port.in.client.GetClientsUseCase;
import com.hotel.backend.application.port.out.LoadClientPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetClientsService implements GetClientsUseCase {

    private final LoadClientPort loadClientPort;

    @Override
    public List<Client> getClients(GetClientsQuery query) {
        return loadClientPort.loadClients(query);
    }

    @Override
    public Client getClientById(Integer id) {
        return loadClientPort.loadClientById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
    }

    @Override
    public ClientDetails getClientDetails(Integer id) {
        return loadClientPort.loadClientDetailsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
    }
}
