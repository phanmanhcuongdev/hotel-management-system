package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.ServiceCatalogItem;
import com.hotel.backend.application.port.in.ManageServiceCatalogUseCase;
import com.hotel.backend.application.port.out.LoadServiceCatalogPort;
import com.hotel.backend.application.port.out.SaveServiceCatalogPort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@UseCase
@RequiredArgsConstructor
public class ServiceCatalogManagementService implements ManageServiceCatalogUseCase {

    private final LoadServiceCatalogPort loadServiceCatalogPort;
    private final SaveServiceCatalogPort saveServiceCatalogPort;

    @Override
    public ServiceCatalogItem createService(String name, String unit, BigDecimal price) {
        String normalizedName = normalizeRequired(name, "name");
        String normalizedUnit = normalizeRequired(unit, "unit");
        BigDecimal normalizedPrice = validatePrice(price);

        if (loadServiceCatalogPort.existsByNameAndUnit(normalizedName, normalizedUnit)) {
            throw new IllegalArgumentException("Service already exists with the same name and unit");
        }

        return saveServiceCatalogPort.saveService(new ServiceCatalogItem(null, normalizedName, normalizedUnit, normalizedPrice));
    }

    @Override
    public ServiceCatalogItem updateService(Integer id, String name, String unit, BigDecimal price) {
        loadServiceCatalogPort.loadServiceById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        String normalizedName = normalizeRequired(name, "name");
        String normalizedUnit = normalizeRequired(unit, "unit");
        BigDecimal normalizedPrice = validatePrice(price);

        if (loadServiceCatalogPort.existsByNameAndUnitAndIdNot(normalizedName, normalizedUnit, id)) {
            throw new IllegalArgumentException("Service already exists with the same name and unit");
        }

        return saveServiceCatalogPort.saveService(new ServiceCatalogItem(id, normalizedName, normalizedUnit, normalizedPrice));
    }

    @Override
    public void deleteService(Integer id) {
        loadServiceCatalogPort.loadServiceById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        if (loadServiceCatalogPort.hasRelatedUsage(id)) {
            throw new BusinessConflictException("Service cannot be deleted because it is already referenced by stay usage records");
        }

        saveServiceCatalogPort.deleteServiceById(id);
    }

    private String normalizeRequired(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " is required");
        }
        return value.trim();
    }

    private BigDecimal validatePrice(BigDecimal price) {
        if (price == null || price.signum() <= 0) {
            throw new IllegalArgumentException("price must be greater than zero");
        }
        return price;
    }
}
