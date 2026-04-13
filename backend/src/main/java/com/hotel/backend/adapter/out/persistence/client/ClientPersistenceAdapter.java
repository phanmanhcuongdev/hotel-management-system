package com.hotel.backend.adapter.out.persistence.client;

import com.hotel.backend.adapter.out.persistence.booking.BookingJpaEntity;
import com.hotel.backend.adapter.out.persistence.booking.SpringDataBookingRepository;
import com.hotel.backend.application.domain.model.Client;
import com.hotel.backend.application.domain.model.ClientBookingHistoryItem;
import com.hotel.backend.application.domain.model.ClientDetails;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.port.in.client.GetClientsQuery;
import com.hotel.backend.application.port.out.DeleteClientPort;
import com.hotel.backend.application.port.out.LoadClientPort;
import com.hotel.backend.application.port.out.SaveClientPort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Expression;
import java.util.List;
import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class ClientPersistenceAdapter implements LoadClientPort, SaveClientPort, DeleteClientPort {

    private static final String AUTO_ID_CARD_PREFIX = "AUTO-PHONE-";
    private static final String DEFAULT_ADDRESS = "UNKNOWN";
    private static final String AUTO_CREATED_DESCRIPTION = "Auto-created from booking flow. Needs profile review.";

    private final SpringDataClientRepository clientRepository;
    private final SpringDataBookingRepository bookingRepository;

    @Override
    public Optional<Client> loadByNormalizedPhone(String normalizedPhone) {
        return clientRepository.findFirstByNormalizedPhone(normalizedPhone)
                .map(this::toDomain);
    }

    @Override
    public List<Client> loadClients(GetClientsQuery query) {
        return clientRepository.findAll(buildClientSpecification(query)).stream()
                .map(this::toDomain)
                .toList();
    }

    @Override
    public Optional<Client> loadClientById(Integer id) {
        return clientRepository.findById(id).map(this::toDomain);
    }

    @Override
    public Optional<ClientDetails> loadClientDetailsById(Integer id) {
        return clientRepository.findById(id)
                .map(entity -> new ClientDetails(
                        toDomain(entity),
                        bookingRepository.findByClientIdOrderByCheckInDesc(id).stream()
                                .map(this::toHistoryItem)
                                .toList()
                ));
    }

    @Override
    public boolean existsByIdCardNumber(String idCardNumber) {
        return clientRepository.existsByIdCardNumber(idCardNumber);
    }

    @Override
    public boolean existsByIdCardNumberAndIdNot(String idCardNumber, Integer id) {
        return clientRepository.existsByIdCardNumberAndIdNot(idCardNumber, id);
    }

    @Override
    public boolean existsByNormalizedPhone(String normalizedPhone) {
        return clientRepository.existsByNormalizedPhone(normalizedPhone);
    }

    @Override
    public boolean existsByNormalizedPhoneAndIdNot(String normalizedPhone, Integer id) {
        return clientRepository.existsByNormalizedPhoneAndIdNot(normalizedPhone, id);
    }

    @Override
    public Client createClient(String idCardNumber, String fullName, String address, String email, String phoneNumber, String description) {
        ClientEntity entity = new ClientEntity();
        entity.idCardNumber = idCardNumber;
        entity.fullName = fullName;
        entity.address = address;
        entity.email = email;
        entity.phone = phoneNumber;
        entity.description = description;

        return toDomain(clientRepository.save(entity));
    }

    @Override
    public Client updateClient(Integer id, String idCardNumber, String fullName, String address, String email, String phoneNumber, String description) {
        ClientEntity entity = clientRepository.findById(id).orElseThrow();
        entity.idCardNumber = idCardNumber;
        entity.fullName = fullName;
        entity.address = address;
        entity.email = email;
        entity.phone = phoneNumber;
        entity.description = description;

        return toDomain(clientRepository.save(entity));
    }

    @Override
    public Client saveAutoCreatedClient(String fullName, String normalizedPhone, String email) {
        ClientEntity entity = new ClientEntity();
        entity.fullName = fullName;
        entity.phone = normalizedPhone;
        entity.email = email;
        entity.address = DEFAULT_ADDRESS;
        entity.idCardNumber = AUTO_ID_CARD_PREFIX + normalizedPhone;
        entity.description = AUTO_CREATED_DESCRIPTION;

        return toDomain(clientRepository.save(entity));
    }

    @Override
    public Client refreshAutoCreatedClientProfile(Integer id, String fullName, String email) {
        ClientEntity entity = clientRepository.findById(id).orElseThrow();

        if (entity.idCardNumber != null && entity.idCardNumber.startsWith(AUTO_ID_CARD_PREFIX)) {
            entity.fullName = fullName;
            if (email != null && !email.isBlank()) {
                entity.email = email;
            }
        }

        return toDomain(clientRepository.save(entity));
    }

    @Override
    public boolean hasBookingHistory(Integer id) {
        return bookingRepository.existsByClient_Id(id);
    }

    @Override
    public void deleteClientById(Integer id) {
        clientRepository.deleteById(id);
    }

    private Specification<ClientEntity> buildClientSpecification(GetClientsQuery query) {
        Specification<ClientEntity> specification = (root, ignoredQuery, cb) -> cb.conjunction();

        if (query.keyword().isPresent()) {
            String normalizedKeyword = "%" + query.keyword().get().trim().toLowerCase() + "%";
            specification = specification.and((root, ignoredQuery, cb) -> cb.or(
                    cb.like(cb.lower(root.get("fullName")), normalizedKeyword),
                    cb.like(cb.lower(root.get("idCardNumber")), normalizedKeyword),
                    cb.like(cb.lower(root.get("address")), normalizedKeyword),
                    cb.like(cb.lower(cb.coalesce(root.get("email"), "")), normalizedKeyword),
                    cb.like(cb.lower(cb.coalesce(root.get("phone"), "")), normalizedKeyword)
            ));
        }

        if (query.needsReview().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) -> {
                Expression<String> idCardNumber = root.get("idCardNumber");
                if (query.needsReview().get()) {
                    return cb.like(idCardNumber, AUTO_ID_CARD_PREFIX + "%");
                }
                return cb.notLike(idCardNumber, AUTO_ID_CARD_PREFIX + "%");
            });
        }

        return specification;
    }

    private ClientBookingHistoryItem toHistoryItem(BookingJpaEntity entity) {
        return new ClientBookingHistoryItem(
                entity.id,
                entity.guestName,
                entity.roomId,
                entity.room != null ? entity.room.roomNumber : null,
                entity.checkIn,
                entity.checkOut,
                BookingStatus.valueOf(entity.status),
                bookingRepository.findBookedRoomCheckedInByBookingId(entity.id).orElse(false)
        );
    }

    private Client toDomain(ClientEntity entity) {
        return new Client(
                entity.id,
                entity.idCardNumber,
                entity.fullName,
                entity.address,
                entity.email,
                entity.phone,
                entity.description,
                entity.idCardNumber != null && entity.idCardNumber.startsWith(AUTO_ID_CARD_PREFIX)
        );
    }
}
