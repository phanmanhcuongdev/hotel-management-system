package com.hotel.backend.config;

import com.hotel.backend.adapter.out.persistence.room.RoomJpaEntity;
import com.hotel.backend.adapter.out.persistence.room.RoomTypeJpaEntity;
import com.hotel.backend.adapter.out.persistence.room.SpringDataRoomRepository;
import com.hotel.backend.adapter.out.persistence.user.UserEntity;
import com.hotel.backend.adapter.out.persistence.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.util.List;

@Component
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DevDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SpringDataRoomRepository roomRepository;
    private final PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("${app.dev-seed.admin-username:}")
    private String adminUsername;

    @Value("${app.dev-seed.admin-password:}")
    private String adminPassword;

    @Value("${app.dev-seed.admin-full-name:Dev Admin}")
    private String adminFullName;

    @Value("${app.dev-seed.admin-position:ADMIN}")
    private String adminPosition;

    @Value("${app.dev-seed.admin-email:}")
    private String adminEmail;

    @Override
    @Transactional
    public void run(String... args) {
        seedUserIfConfigured();
        seedRoomTypesAndRooms();
    }

    private void seedUserIfConfigured() {
        if (adminUsername == null || adminUsername.isBlank() || adminPassword == null || adminPassword.isBlank()) {
            log.info("[DevSeed] No dev admin credentials configured. Skipping user seed.");
            return;
        }

        if (userRepository.findByUsername(adminUsername).isPresent()) {
            log.info("[DevSeed] Dev admin '{}' already exists, skipping.", adminUsername);
            return;
        }

        UserEntity admin = new UserEntity();
        admin.setUsername(adminUsername);
        admin.setPassword(passwordEncoder.encode(adminPassword));
        admin.setFullName(adminFullName);
        admin.setPosition(adminPosition);
        admin.setMail(adminEmail.isBlank() ? null : adminEmail);
        admin.setDescription("Dev seed user");
        userRepository.save(admin);

        log.info("[DevSeed] Seeded dev admin user '{}'.", adminUsername);
    }

    private void seedRoomTypesAndRooms() {
        long count = roomRepository.count();
        if (count > 0) {
            log.info("[DevSeed] Rooms already seeded ({} rooms), skipping.", count);
            return;
        }

        RoomTypeJpaEntity standard = new RoomTypeJpaEntity();
        standard.name = "Standard";
        standard.price = new BigDecimal("100.00");
        standard.capacity = 2;
        entityManager.persist(standard);

        RoomTypeJpaEntity deluxe = new RoomTypeJpaEntity();
        deluxe.name = "Deluxe";
        deluxe.price = new BigDecimal("150.00");
        deluxe.capacity = 2;
        entityManager.persist(deluxe);

        RoomTypeJpaEntity suite = new RoomTypeJpaEntity();
        suite.name = "Suite";
        suite.price = new BigDecimal("250.00");
        suite.capacity = 4;
        entityManager.persist(suite);

        entityManager.flush();

        List<Object[]> rooms = List.of(
                new Object[]{"101", "OCCUPIED", standard},
                new Object[]{"102", "AVAILABLE", standard},
                new Object[]{"103", "OCCUPIED", deluxe},
                new Object[]{"104", "AVAILABLE", deluxe},
                new Object[]{"105", "MAINTENANCE", standard},
                new Object[]{"106", "AVAILABLE", suite},
                new Object[]{"201", "OCCUPIED", deluxe},
                new Object[]{"202", "AVAILABLE", deluxe},
                new Object[]{"203", "OCCUPIED", suite},
                new Object[]{"204", "AVAILABLE", standard},
                new Object[]{"205", "AVAILABLE", deluxe},
                new Object[]{"206", "OCCUPIED", suite},
                new Object[]{"301", "AVAILABLE", suite},
                new Object[]{"302", "OCCUPIED", suite},
                new Object[]{"303", "AVAILABLE", deluxe},
                new Object[]{"304", "MAINTENANCE", standard},
                new Object[]{"305", "AVAILABLE", deluxe},
                new Object[]{"306", "OCCUPIED", standard}
        );

        for (Object[] rawRoom : rooms) {
            RoomJpaEntity room = new RoomJpaEntity();
            room.roomNumber = (String) rawRoom[0];
            room.status = (String) rawRoom[1];
            room.roomType = (RoomTypeJpaEntity) rawRoom[2];
            entityManager.persist(room);
        }

        entityManager.flush();
        log.info("[DevSeed] Seeded 3 room types and 18 rooms.");
    }
}
