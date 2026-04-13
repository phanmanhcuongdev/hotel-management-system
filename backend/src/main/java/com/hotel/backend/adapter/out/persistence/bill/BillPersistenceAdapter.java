package com.hotel.backend.adapter.out.persistence.bill;

import com.hotel.backend.adapter.out.persistence.bookedroom.SpringDataBookedRoomRepository;
import com.hotel.backend.adapter.out.persistence.booking.BookingJpaEntity;
import com.hotel.backend.adapter.out.persistence.booking.SpringDataBookingRepository;
import com.hotel.backend.adapter.out.persistence.user.UserRepository;
import com.hotel.backend.adapter.out.persistence.usedservice.SpringDataUsedServiceRepository;
import com.hotel.backend.application.domain.model.BillDetails;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.BillServiceItem;
import com.hotel.backend.application.domain.model.BillLedgerItem;
import com.hotel.backend.application.domain.model.BillSummary;
import com.hotel.backend.application.domain.model.PaymentType;
import com.hotel.backend.application.port.in.GetBillsQuery;
import com.hotel.backend.application.port.out.LoadBillLedgerPort;
import com.hotel.backend.application.port.out.LoadBillSummaryPort;
import com.hotel.backend.application.port.out.SaveBillPort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BillPersistenceAdapter implements LoadBillSummaryPort, SaveBillPort, LoadBillLedgerPort {

    private final SpringDataBillRepository billRepository;
    private final SpringDataBookingRepository bookingRepository;
    private final SpringDataBookedRoomRepository bookedRoomRepository;
    private final SpringDataUsedServiceRepository usedServiceRepository;
    private final UserRepository userRepository;

    @Override
    public List<BillLedgerItem> loadBills(GetBillsQuery query) {
        return billRepository.findAll(buildBillSpecification(query), Sort.by(Sort.Order.desc("paymentDate"), Sort.Order.desc("id"))).stream()
                .map(this::toLedgerItem)
                .toList();
    }

    @Override
    public Optional<BillDetails> loadBillDetail(Integer billId) {
        return billRepository.findDetailById(billId)
                .map(entity -> new BillDetails(
                        toLedgerItem(entity),
                        entity.user != null ? entity.user.getId() : null,
                        entity.user != null ? entity.user.getUsername() : null,
                        entity.user != null ? entity.user.getFullName() : null,
                        loadBookingBillSummary(entity.booking.id)
                ));
    }

    @Override
    public BillSummary loadBookingBillSummary(Long bookingId) {
        BookingJpaEntity booking = bookingRepository.findDetailById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        var bookedRoom = bookedRoomRepository.findFirstByBooking_IdOrderByIdAsc(bookingId);
        List<BillServiceItem> serviceItems = bookedRoom
                .map(entity -> usedServiceRepository.findByBookedRoom_Id(entity.id).stream()
                        .map(usedService -> {
                            BigDecimal gross = usedService.service.price.multiply(BigDecimal.valueOf(usedService.quantity));
                            BigDecimal total = gross.subtract(defaultAmount(usedService.discount)).max(BigDecimal.ZERO);
                            return new BillServiceItem(
                                    usedService.service.id,
                                    usedService.service.name,
                                    usedService.service.unit,
                                    usedService.quantity,
                                    usedService.service.price,
                                    defaultAmount(usedService.discount),
                                    total
                            );
                        })
                        .toList())
                .orElseGet(List::of);

        long nights = Math.max(1, ChronoUnit.DAYS.between(booking.checkIn, booking.checkOut));
        BigDecimal baseRoomCharge = booking.room.roomType.price.multiply(BigDecimal.valueOf(nights));
        BigDecimal totalDiscount = defaultAmount(booking.discount)
                .add(bookedRoom.map(entity -> defaultAmount(entity.discount)).orElse(BigDecimal.ZERO));
        BigDecimal roomCharge = baseRoomCharge.subtract(totalDiscount).max(BigDecimal.ZERO);
        BigDecimal serviceCharge = serviceItems.stream()
                .map(BillServiceItem::totalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalAmount = roomCharge.add(serviceCharge);

        var existingBill = billRepository.findByBooking_Id(bookingId);

        return new BillSummary(
                existingBill.map(bill -> bill.id).orElse(null),
                booking.id,
                booking.status,
                booking.guestName,
                booking.room != null ? booking.room.roomNumber : null,
                booking.checkIn,
                booking.checkOut,
                nights,
                defaultAmount(booking.discount),
                booking.note,
                roomCharge,
                serviceCharge,
                totalAmount,
                existingBill.map(bill -> bill.paymentAmount).orElse(null),
                existingBill.map(bill -> PaymentType.fromCode(bill.paymentType)).orElse(null),
                existingBill.map(bill -> bill.paymentDate).orElse(null),
                existingBill.map(bill -> bill.note).orElse(null),
                existingBill.isPresent(),
                serviceItems
        );
    }

    @Override
    @Transactional
    public BillSummary createBill(Long bookingId, Integer userId, PaymentType paymentType, String note) {
        BillSummary summary = loadBookingBillSummary(bookingId);

        BillEntity bill = new BillEntity();
        bill.paymentDate = LocalDate.now();
        bill.paymentAmount = summary.totalAmount();
        bill.paymentType = paymentType.getCode();
        bill.note = note;
        bill.booking = bookingRepository.getReferenceById(bookingId);
        bill.user = userRepository.getReferenceById(userId);

        billRepository.save(bill);

        return loadBookingBillSummary(bookingId);
    }

    private BigDecimal defaultAmount(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }

    private BillLedgerItem toLedgerItem(BillEntity entity) {
        return new BillLedgerItem(
                entity.id,
                entity.booking != null ? entity.booking.id : null,
                entity.booking != null ? entity.booking.guestName : null,
                entity.booking != null && entity.booking.room != null ? entity.booking.room.roomNumber : null,
                entity.booking != null ? entity.booking.status : null,
                entity.paymentAmount,
                entity.paymentType != null ? PaymentType.fromCode(entity.paymentType) : null,
                entity.paymentDate,
                entity.note
        );
    }

    private Specification<BillEntity> buildBillSpecification(GetBillsQuery query) {
        Specification<BillEntity> specification = (root, criteriaQuery, cb) -> {
            if (!Long.class.equals(criteriaQuery.getResultType()) && !long.class.equals(criteriaQuery.getResultType())) {
                root.fetch("booking", jakarta.persistence.criteria.JoinType.LEFT).fetch("room", jakarta.persistence.criteria.JoinType.LEFT);
                root.fetch("user", jakarta.persistence.criteria.JoinType.LEFT);
                criteriaQuery.distinct(true);
            }
            return cb.conjunction();
        };

        if (query.paymentDateFrom().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.greaterThanOrEqualTo(root.get("paymentDate"), query.paymentDateFrom().get()));
        }

        if (query.paymentDateTo().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.lessThanOrEqualTo(root.get("paymentDate"), query.paymentDateTo().get()));
        }

        if (query.paymentType().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.equal(root.get("paymentType"), query.paymentType().get().getCode()));
        }

        if (query.bookingId().isPresent()) {
            specification = specification.and((root, ignoredQuery, cb) ->
                    cb.equal(root.join("booking").get("id"), query.bookingId().get()));
        }

        if (query.keyword().isPresent() && !query.keyword().get().isBlank()) {
            String keyword = query.keyword().get().trim();
            String normalizedKeyword = "%" + keyword.toLowerCase() + "%";
            specification = specification.and((root, ignoredQuery, cb) -> {
                var bookingJoin = root.join("booking");
                var roomJoin = bookingJoin.join("room", jakarta.persistence.criteria.JoinType.LEFT);
                var guestPredicate = cb.like(cb.lower(bookingJoin.get("guestName")), normalizedKeyword);
                var roomPredicate = cb.like(cb.lower(roomJoin.get("roomNumber")), normalizedKeyword);
                var billIdPredicate = cb.equal(root.get("id").as(String.class), keyword);
                var bookingIdPredicate = cb.equal(bookingJoin.get("id").as(String.class), keyword);
                return cb.or(guestPredicate, roomPredicate, billIdPredicate, bookingIdPredicate);
            });
        }

        return specification;
    }
}
