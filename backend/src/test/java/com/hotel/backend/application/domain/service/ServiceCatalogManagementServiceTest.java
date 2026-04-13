package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.ServiceCatalogItem;
import com.hotel.backend.application.port.out.LoadServiceCatalogPort;
import com.hotel.backend.application.port.out.SaveServiceCatalogPort;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ServiceCatalogManagementServiceTest {

    @Mock
    private LoadServiceCatalogPort loadServiceCatalogPort;

    @Mock
    private SaveServiceCatalogPort saveServiceCatalogPort;

    @InjectMocks
    private ServiceCatalogManagementService serviceCatalogManagementService;

    @Test
    void createServiceBlocksDuplicateNameAndUnit() {
        when(loadServiceCatalogPort.existsByNameAndUnit("Breakfast", "set")).thenReturn(true);

        assertThatThrownBy(() -> serviceCatalogManagementService.createService("Breakfast", "set", BigDecimal.TEN))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Service already exists with the same name and unit");
    }

    @Test
    void updateServiceThrowsWhenNotFound() {
        when(loadServiceCatalogPort.loadServiceById(2)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> serviceCatalogManagementService.updateService(2, "Laundry", "kg", BigDecimal.valueOf(5)))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Service not found");
    }

    @Test
    void createServicePersistsValidService() {
        when(loadServiceCatalogPort.existsByNameAndUnit("Laundry", "kg")).thenReturn(false);

        serviceCatalogManagementService.createService("Laundry", "kg", BigDecimal.valueOf(5));

        verify(saveServiceCatalogPort).saveService(new ServiceCatalogItem(null, "Laundry", "kg", BigDecimal.valueOf(5)));
    }

    @Test
    void deleteServiceBlocksWhenUsageExists() {
        when(loadServiceCatalogPort.loadServiceById(3)).thenReturn(Optional.of(new ServiceCatalogItem(3, "Minibar", "item", BigDecimal.valueOf(8))));
        when(loadServiceCatalogPort.hasRelatedUsage(3)).thenReturn(true);

        assertThatThrownBy(() -> serviceCatalogManagementService.deleteService(3))
                .isInstanceOf(BusinessConflictException.class)
                .hasMessage("Service cannot be deleted because it is already referenced by stay usage records");
    }

    @Test
    void deleteServiceDeletesWhenNoUsageExists() {
        when(loadServiceCatalogPort.loadServiceById(4)).thenReturn(Optional.of(new ServiceCatalogItem(4, "Spa", "session", BigDecimal.valueOf(30))));
        when(loadServiceCatalogPort.hasRelatedUsage(4)).thenReturn(false);

        serviceCatalogManagementService.deleteService(4);

        verify(saveServiceCatalogPort).deleteServiceById(4);
    }
}
