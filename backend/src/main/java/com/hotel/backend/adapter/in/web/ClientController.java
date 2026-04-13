package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.ClientDetailResponse;
import com.hotel.backend.adapter.in.web.dto.ClientSummaryResponse;
import com.hotel.backend.adapter.in.web.dto.CreateClientRequest;
import com.hotel.backend.application.port.in.client.CreateClientCommand;
import com.hotel.backend.application.port.in.client.GetClientsQuery;
import com.hotel.backend.application.port.in.client.GetClientsUseCase;
import com.hotel.backend.application.port.in.client.ManageClientUseCase;
import com.hotel.backend.application.port.in.client.UpdateClientCommand;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Optional;

@WebAdapter
@RequestMapping("/api/clients")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ClientController {

    private final GetClientsUseCase getClientsUseCase;
    private final ManageClientUseCase manageClientUseCase;

    @GetMapping
    public List<ClientSummaryResponse> getClients(@RequestParam Optional<String> keyword,
                                                  @RequestParam Optional<Boolean> needsReview) {
        return getClientsUseCase.getClients(new GetClientsQuery(
                        keyword.map(String::trim).filter(value -> !value.isBlank()),
                        needsReview
                )).stream()
                .map(ClientWebMapper::toSummaryResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public ClientDetailResponse getClientById(@PathVariable Integer id) {
        return ClientWebMapper.toDetailResponse(getClientsUseCase.getClientDetails(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClientSummaryResponse createClient(@RequestBody @Valid CreateClientRequest request) {
        return ClientWebMapper.toSummaryResponse(manageClientUseCase.createClient(
                new CreateClientCommand(
                        request.idCardNumber(),
                        request.fullName(),
                        request.address(),
                        request.email(),
                        request.phoneNumber(),
                        request.description()
                )
        ));
    }

    @PatchMapping("/{id}")
    public ClientSummaryResponse updateClient(@PathVariable Integer id,
                                              @RequestBody @Valid CreateClientRequest request) {
        return ClientWebMapper.toSummaryResponse(manageClientUseCase.updateClient(
                new UpdateClientCommand(
                        id,
                        request.idCardNumber(),
                        request.fullName(),
                        request.address(),
                        request.email(),
                        request.phoneNumber(),
                        request.description()
                )
        ));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteClient(@PathVariable Integer id) {
        manageClientUseCase.deleteClient(id);
    }
}
