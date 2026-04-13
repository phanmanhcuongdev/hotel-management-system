package com.hotel.backend.adapter.out.persistence.usedservice;

import com.hotel.backend.adapter.out.persistence.bookedroom.SpringDataBookedRoomRepository;
import com.hotel.backend.adapter.out.persistence.service.SpringDataServiceRepository;
import com.hotel.backend.application.domain.model.UsedServiceItem;
import com.hotel.backend.application.port.out.LoadUsedServicePort;
import com.hotel.backend.application.port.out.SaveUsedServicePort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@PersistenceAdapter
@RequiredArgsConstructor
public class UsedServicePersistenceAdapter implements LoadUsedServicePort, SaveUsedServicePort {

    private final SpringDataUsedServiceRepository usedServiceRepository;
    private final SpringDataServiceRepository serviceRepository;
    private final SpringDataBookedRoomRepository bookedRoomRepository;

    @Override
    public List<UsedServiceItem> loadUsedServicesByBookedRoomId(Integer bookedRoomId) {
        return usedServiceRepository.findByBookedRoom_Id(bookedRoomId).stream()
                .map(this::toDomain)
                .toList();
    }

    @Override
    public UsedServiceItem saveUsedService(Integer bookedRoomId, Integer serviceId, Integer quantity, BigDecimal discount) {
        UsedServiceEntity entity = new UsedServiceEntity();
        entity.bookedRoom = bookedRoomRepository.getReferenceById(bookedRoomId);
        entity.service = serviceRepository.getReferenceById(serviceId);
        entity.quantity = quantity;
        entity.discount = discount;

        return toDomain(usedServiceRepository.save(entity));
    }

    private UsedServiceItem toDomain(UsedServiceEntity entity) {
        BigDecimal gross = entity.service.price.multiply(BigDecimal.valueOf(entity.quantity));
        BigDecimal total = gross.subtract(entity.discount == null ? BigDecimal.ZERO : entity.discount).max(BigDecimal.ZERO);

        return new UsedServiceItem(
                entity.id,
                entity.service.id,
                entity.service.name,
                entity.service.unit,
                entity.bookedRoom.id,
                entity.quantity,
                entity.service.price,
                entity.discount == null ? BigDecimal.ZERO : entity.discount,
                total
        );
    }
}
