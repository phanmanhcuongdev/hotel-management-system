package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.ServiceCatalogResponse;
import com.hotel.backend.adapter.in.web.dto.UsedServiceResponse;
import com.hotel.backend.application.domain.model.ServiceCatalogItem;
import com.hotel.backend.application.domain.model.UsedServiceItem;

public final class ServiceWebMapper {
    private ServiceWebMapper() {
    }

    public static ServiceCatalogResponse toResponse(ServiceCatalogItem service) {
        return new ServiceCatalogResponse(
                service.id(),
                service.name(),
                service.unit(),
                service.price()
        );
    }

    public static UsedServiceResponse toResponse(UsedServiceItem usedService) {
        return new UsedServiceResponse(
                usedService.id(),
                usedService.serviceId(),
                usedService.serviceName(),
                usedService.unit(),
                usedService.bookedRoomId(),
                usedService.quantity(),
                usedService.unitPrice(),
                usedService.discount(),
                usedService.totalAmount()
        );
    }
}
