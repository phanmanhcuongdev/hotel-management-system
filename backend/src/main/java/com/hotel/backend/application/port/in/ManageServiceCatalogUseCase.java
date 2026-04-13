package com.hotel.backend.application.port.in;

import com.hotel.backend.application.domain.model.ServiceCatalogItem;

import java.math.BigDecimal;

public interface ManageServiceCatalogUseCase {
    ServiceCatalogItem createService(String name, String unit, BigDecimal price);

    ServiceCatalogItem updateService(Integer id, String name, String unit, BigDecimal price);

    void deleteService(Integer id);
}
