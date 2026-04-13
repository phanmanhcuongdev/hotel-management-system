package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.ServiceCatalogItem;

import java.util.List;

public interface GetServicesUseCase {
    List<ServiceCatalogItem> getServices();
}
