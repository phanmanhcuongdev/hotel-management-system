package com.hotel.backend.config;

import com.hotel.backend.adapter.out.persistence.BookingPersistenceAdapter;
import com.hotel.backend.adapter.out.persistence.RoomPersistenceAdapter;
import com.hotel.backend.adapter.out.persistence.SpringDataBookingRepository;
import com.hotel.backend.adapter.out.persistence.SpringDataRoomRepository;
import com.hotel.backend.application.domain.service.CreateBookingService;
import com.hotel.backend.application.domain.service.GetRoomsService;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public LoadRoomsPort loadRoomsPort(SpringDataRoomRepository repo) {
        return new RoomPersistenceAdapter(repo);
    }

    @Bean
    public LoadRoomPort loadRoomPort(SpringDataRoomRepository repo) {
        return new RoomPersistenceAdapter(repo);
    }

    @Bean
    public SaveBookingPort saveBookingPort(SpringDataBookingRepository repo) {
        return new BookingPersistenceAdapter(repo);
    }

    @Bean
    public GetRoomsUseCase getRoomsUseCase(LoadRoomsPort loadRoomsPort) {
        return new GetRoomsService(loadRoomsPort);
    }

    @Bean
    public CreateBookingUseCase createBookingUseCase(LoadRoomPort loadRoomPort, SaveBookingPort saveBookingPort) {
        return new CreateBookingService(loadRoomPort, saveBookingPort);
    }
}