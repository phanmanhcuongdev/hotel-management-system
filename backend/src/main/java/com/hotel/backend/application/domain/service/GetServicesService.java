package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.model.ServiceCatalogItem;
import com.hotel.backend.application.port.in.GetServicesUseCase;
import com.hotel.backend.application.port.out.LoadServiceCatalogPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetServicesService implements GetServicesUseCase {

    private final LoadServiceCatalogPort loadServiceCatalogPort;

    @Override
    public List<ServiceCatalogItem> getServices() {
        return loadServiceCatalogPort.loadServices();
    }
}
