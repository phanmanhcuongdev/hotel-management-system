package com.hotel.backend.config;

import com.hotel.backend.adapter.out.persistence.BookingPersistenceAdapter;
import com.hotel.backend.adapter.out.persistence.RoomPersistenceAdapter;
import com.hotel.backend.adapter.out.persistence.SpringDataBookingRepository;
import com.hotel.backend.adapter.out.persistence.SpringDataRoomRepository;
import com.hotel.backend.adapter.out.persistence.SpringDataRoomTypeRepository;
import com.hotel.backend.adapter.out.persistence.SpringDataUserRepository;
import com.hotel.backend.adapter.out.persistence.UserPersistenceAdapter;
import com.hotel.backend.application.domain.service.AuthService;
import com.hotel.backend.application.domain.service.CreateBookingService;
import com.hotel.backend.application.domain.service.GetBookingService;
import com.hotel.backend.application.domain.service.GetBookingsService;
import com.hotel.backend.application.domain.service.GetRoomService;
import com.hotel.backend.application.domain.service.GetRoomsService;
import com.hotel.backend.application.domain.service.RoomService;
import com.hotel.backend.application.domain.service.UpdateBookingService;
import com.hotel.backend.application.port.in.AuthUseCase;
import com.hotel.backend.application.port.in.CreateBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingUseCase;
import com.hotel.backend.application.port.in.GetBookingsUseCase;
import com.hotel.backend.application.port.in.GetRoomUseCase;
import com.hotel.backend.application.port.in.GetRoomsUseCase;
import com.hotel.backend.application.port.in.SaveRoomUseCase;
import com.hotel.backend.application.port.in.UpdateBookingUseCase;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.LoadBookingsPort;
import com.hotel.backend.application.port.out.LoadRoomPort;
import com.hotel.backend.application.port.out.LoadRoomsPort;
import com.hotel.backend.application.port.out.LoadUserPort;
import com.hotel.backend.application.port.out.SaveBookingPort;
import com.hotel.backend.application.port.out.SaveRoomPort;
import com.hotel.backend.application.port.out.UpdateBookingPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeanConfig {

    @Bean
    public SpringDataRoomTypeRepository springDataRoomTypeRepository() {
        return new SpringDataRoomTypeRepository();
    }

    @Bean
    public SpringDataUserRepository springDataUserRepository() {
        return new SpringDataUserRepository();
    }

    @Bean
    public BookingPersistenceAdapter bookingPersistenceAdapter(SpringDataBookingRepository bookingRepo) {
        return new BookingPersistenceAdapter(bookingRepo);
    }

    @Bean
    public RoomPersistenceAdapter roomPersistenceAdapter(SpringDataRoomRepository repo, SpringDataRoomTypeRepository roomTypeRepo) {
        return new RoomPersistenceAdapter(repo, roomTypeRepo);
    }

    @Bean
    public UserPersistenceAdapter userPersistenceAdapter(SpringDataUserRepository userRepo) {
        return new UserPersistenceAdapter(userRepo);
    }

    @Bean
    public LoadRoomsPort loadRoomsPort(RoomPersistenceAdapter adapter) {
        return adapter;
    }

    @Bean
    public LoadRoomPort loadRoomPort(RoomPersistenceAdapter adapter) {
        return adapter;
    }

    @Bean
    public SaveRoomPort saveRoomPort(RoomPersistenceAdapter adapter) {
        return adapter;
    }

    @Bean
    public LoadBookingsPort loadBookingsPort(BookingPersistenceAdapter adapter) {
        return adapter;
    }

    @Bean
    public LoadBookingPort loadBookingPort(BookingPersistenceAdapter adapter) {
        return adapter;
    }

    @Bean
    public UpdateBookingPort updateBookingPort(BookingPersistenceAdapter adapter) {
        return adapter;
    }

    @Bean
    public LoadUserPort loadUserPort(UserPersistenceAdapter adapter) {
        return adapter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public GetRoomsUseCase getRoomsUseCase(LoadRoomsPort loadRoomsPort) {
        return new GetRoomsService(loadRoomsPort);
    }

    @Bean
    public GetRoomUseCase getRoomUseCase(LoadRoomPort loadRoomPort) {
        return new GetRoomService(loadRoomPort);
    }

    @Bean
    public SaveRoomUseCase saveRoomUseCase(SaveRoomPort saveRoomPort, LoadRoomPort loadRoomPort,
                                            SpringDataRoomRepository roomRepo, SpringDataRoomTypeRepository roomTypeRepo) {
        return new RoomService(saveRoomPort, loadRoomPort, roomRepo, roomTypeRepo);
    }

    @Bean
    public SaveBookingPort saveBookingPort(BookingPersistenceAdapter adapter) {
        return adapter;
    }

    @Bean
    public CreateBookingUseCase createBookingUseCase(LoadRoomPort loadRoomPort, SaveBookingPort saveBookingPort) {
        return new CreateBookingService(loadRoomPort, saveBookingPort);
    }

    @Bean
    public GetBookingsUseCase getBookingsUseCase(LoadBookingsPort loadBookingsPort) {
        return new GetBookingsService(loadBookingsPort);
    }

    @Bean
    public GetBookingUseCase getBookingUseCase(LoadBookingPort loadBookingPort) {
        return new GetBookingService(loadBookingPort);
    }

    @Bean
    public UpdateBookingUseCase updateBookingUseCase(UpdateBookingPort updateBookingPort) {
        return new UpdateBookingService(updateBookingPort);
    }

    @Bean
    public AuthUseCase authUseCase(LoadUserPort loadUserPort, PasswordEncoder passwordEncoder, JwtConfig jwtConfig) {
        return new AuthService(loadUserPort, passwordEncoder, jwtConfig.getSecret(), jwtConfig.getExpirationMs());
    }
}
