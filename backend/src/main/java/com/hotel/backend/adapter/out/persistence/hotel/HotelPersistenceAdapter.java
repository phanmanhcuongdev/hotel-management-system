package com.hotel.backend.adapter.out.persistence.hotel;

import com.hotel.backend.application.domain.model.HotelProfile;
import com.hotel.backend.application.port.out.LoadHotelProfilePort;
import com.hotel.backend.application.port.out.SaveHotelProfilePort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class HotelPersistenceAdapter implements LoadHotelProfilePort, SaveHotelProfilePort {

    private final SpringDataHotelRepository hotelRepository;

    @Override
    public Optional<HotelProfile> loadCurrentHotel() {
        return hotelRepository.findFirstByOrderByIdAsc().map(this::toDomain);
    }

    @Override
    public HotelProfile saveHotel(HotelProfile hotelProfile) {
        HotelEntity entity = hotelRepository.findById(hotelProfile.id()).orElseGet(HotelEntity::new);
        entity.id = hotelProfile.id();
        entity.name = hotelProfile.name();
        entity.starLevel = hotelProfile.starLevel();
        entity.address = hotelProfile.address();
        entity.description = hotelProfile.description();
        return toDomain(hotelRepository.save(entity));
    }

    private HotelProfile toDomain(HotelEntity entity) {
        return new HotelProfile(
                entity.id,
                entity.name,
                entity.starLevel,
                entity.address,
                entity.description
        );
    }
}
