package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.ServiceCatalogItem;

import java.util.List;
import java.util.Optional;

public interface LoadServiceCatalogPort {
    List<ServiceCatalogItem> loadServices();

    Optional<ServiceCatalogItem> loadServiceById(Integer id);

    boolean existsByNameAndUnit(String name, String unit);

    boolean existsByNameAndUnitAndIdNot(String name, String unit, Integer id);

    boolean hasRelatedUsage(Integer id);
}
