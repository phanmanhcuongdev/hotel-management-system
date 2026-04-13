package com.hotel.backend.adapter.out.persistence.service;

import com.hotel.backend.adapter.out.persistence.usedservice.SpringDataUsedServiceRepository;
import com.hotel.backend.application.domain.model.ServiceCatalogItem;
import com.hotel.backend.application.port.out.LoadServiceCatalogPort;
import com.hotel.backend.application.port.out.SaveServiceCatalogPort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class ServiceCatalogPersistenceAdapter implements LoadServiceCatalogPort, SaveServiceCatalogPort {

    private final SpringDataServiceRepository serviceRepository;
    private final SpringDataUsedServiceRepository usedServiceRepository;

    @Override
    public List<ServiceCatalogItem> loadServices() {
        return serviceRepository.findAllByOrderByNameAscUnitAsc().stream()
                .map(this::toDomain)
                .toList();
    }

    @Override
    public Optional<ServiceCatalogItem> loadServiceById(Integer id) {
        return serviceRepository.findById(id).map(this::toDomain);
    }

    @Override
    public boolean existsByNameAndUnit(String name, String unit) {
        return serviceRepository.existsByNameIgnoreCaseAndUnitIgnoreCase(name, unit);
    }

    @Override
    public boolean existsByNameAndUnitAndIdNot(String name, String unit, Integer id) {
        return serviceRepository.existsByNameIgnoreCaseAndUnitIgnoreCaseAndIdNot(name, unit, id);
    }

    @Override
    public boolean hasRelatedUsage(Integer id) {
        return usedServiceRepository.existsByService_Id(id);
    }

    @Override
    public ServiceCatalogItem saveService(ServiceCatalogItem service) {
        ServiceEntity entity = service.id() != null
                ? serviceRepository.findById(service.id()).orElseGet(ServiceEntity::new)
                : new ServiceEntity();

        entity.id = service.id();
        entity.name = service.name();
        entity.unit = service.unit();
        entity.price = service.price();

        return toDomain(serviceRepository.save(entity));
    }

    @Override
    public void deleteServiceById(Integer id) {
        serviceRepository.deleteById(id);
    }

    private ServiceCatalogItem toDomain(ServiceEntity entity) {
        return new ServiceCatalogItem(entity.id, entity.name, entity.unit, entity.price);
    }
}
