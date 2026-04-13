package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.CreateServiceRequest;
import com.hotel.backend.adapter.in.web.dto.ServiceCatalogResponse;
import com.hotel.backend.application.port.in.GetServicesUseCase;
import com.hotel.backend.application.port.in.ManageServiceCatalogUseCase;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@WebAdapter
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final GetServicesUseCase getServicesUseCase;
    private final ManageServiceCatalogUseCase manageServiceCatalogUseCase;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ServiceCatalogResponse> getServices() {
        return getServicesUseCase.getServices().stream()
                .map(ServiceWebMapper::toResponse)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public ServiceCatalogResponse createService(@Valid @RequestBody CreateServiceRequest request) {
        return ServiceWebMapper.toResponse(manageServiceCatalogUseCase.createService(
                request.name(),
                request.unit(),
                request.price()
        ));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ServiceCatalogResponse updateService(@PathVariable Integer id,
                                                @Valid @RequestBody CreateServiceRequest request) {
        return ServiceWebMapper.toResponse(manageServiceCatalogUseCase.updateService(
                id,
                request.name(),
                request.unit(),
                request.price()
        ));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteService(@PathVariable Integer id) {
        manageServiceCatalogUseCase.deleteService(id);
    }
}
