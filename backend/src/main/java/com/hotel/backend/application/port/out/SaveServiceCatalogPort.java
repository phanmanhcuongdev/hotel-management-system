package com.hotel.backend.application.port.out;

import com.hotel.backend.application.domain.model.ServiceCatalogItem;

public interface SaveServiceCatalogPort {
    ServiceCatalogItem saveService(ServiceCatalogItem service);

    void deleteServiceById(Integer id);
}
