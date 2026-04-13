package com.hotel.backend.adapter.out.persistence.report;

import com.hotel.backend.adapter.out.persistence.bill.BillEntity;
import com.hotel.backend.adapter.out.persistence.bill.SpringDataBillRepository;
import com.hotel.backend.adapter.out.persistence.bookedroom.BookedRoomEntity;
import com.hotel.backend.adapter.out.persistence.bookedroom.SpringDataBookedRoomRepository;
import com.hotel.backend.adapter.out.persistence.booking.BookingJpaEntity;
import com.hotel.backend.adapter.out.persistence.booking.SpringDataBookingRepository;
import com.hotel.backend.adapter.out.persistence.room.RoomEntity;
import com.hotel.backend.adapter.out.persistence.room.SpringDataRoomRepository;
import com.hotel.backend.application.domain.model.RoomStatus;
import com.hotel.backend.application.domain.model.report.DailyOccupancyPoint;
import com.hotel.backend.application.domain.model.report.DailyRevenuePoint;
import com.hotel.backend.application.domain.model.report.OccupancyReport;
import com.hotel.backend.application.domain.model.report.RevenueReport;
import com.hotel.backend.application.domain.model.report.RoomRevenueItem;
import com.hotel.backend.application.port.out.report.LoadReportPort;
import com.hotel.backend.config.PersistenceAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@PersistenceAdapter
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportPersistenceAdapter implements LoadReportPort {

    private static final List<String> REPORT_BOOKING_STATUSES = List.of("PENDING", "CONFIRMED", "COMPLETED");

    private final SpringDataBillRepository billRepository;
    private final SpringDataRoomRepository roomRepository;
    private final SpringDataBookingRepository bookingRepository;
    private final SpringDataBookedRoomRepository bookedRoomRepository;

    @Override
    public RevenueReport loadRevenueReport(LocalDate startDate, LocalDate endDate, Optional<Long> roomId) {
        List<BillEntity> bills = billRepository.findForReport(startDate, endDate);
        if (roomId.isPresent()) {
            bills = bills.stream()
                    .filter(bill -> bill.booking != null && bill.booking.room != null && roomId.get().equals(bill.booking.room.id))
                    .toList();
        }

        Map<LocalDate, BigDecimal> dailyRevenueMap = new HashMap<>();
        Map<LocalDate, Long> dailyBillCountMap = new HashMap<>();
        Map<Long, RoomRevenueAccumulator> roomRevenueMap = new HashMap<>();

        BigDecimal totalRevenue = BigDecimal.ZERO;
        long totalBills = 0;

        for (BillEntity bill : bills) {
            BigDecimal amount = defaultAmount(bill.paymentAmount);
            totalRevenue = totalRevenue.add(amount);
            totalBills++;

            dailyRevenueMap.merge(bill.paymentDate, amount, BigDecimal::add);
            dailyBillCountMap.merge(bill.paymentDate, 1L, Long::sum);

            if (bill.booking != null && bill.booking.room != null) {
                RoomRevenueAccumulator accumulator = roomRevenueMap.computeIfAbsent(
                        bill.booking.room.id,
                        ignored -> new RoomRevenueAccumulator(
                                bill.booking.room.id,
                                bill.booking.room.roomNumber,
                                BigDecimal.ZERO,
                                0L
                        )
                );
                accumulator.revenue = accumulator.revenue.add(amount);
                accumulator.billCount++;
            }
        }

        List<DailyRevenuePoint> dailyRevenue = new ArrayList<>();
        LocalDate current = startDate;
        while (!current.isAfter(endDate)) {
            dailyRevenue.add(new DailyRevenuePoint(
                    current,
                    dailyRevenueMap.getOrDefault(current, BigDecimal.ZERO),
                    dailyBillCountMap.getOrDefault(current, 0L)
            ));
            current = current.plusDays(1);
        }

        List<RoomRevenueItem> revenueByRoom = roomRevenueMap.values().stream()
                .map(item -> new RoomRevenueItem(item.roomId, item.roomNumber, item.revenue, item.billCount))
                .sorted(Comparator.comparing(RoomRevenueItem::revenue).reversed()
                        .thenComparing(RoomRevenueItem::roomNumber, Comparator.nullsLast(String::compareTo)))
                .toList();

        return new RevenueReport(
                startDate,
                endDate,
                roomId.orElse(null),
                totalRevenue,
                totalBills,
                divide(totalRevenue, BigDecimal.valueOf(Math.max(totalBills, 1))),
                dailyRevenue,
                revenueByRoom,
                true
        );
    }

    @Override
    public OccupancyReport loadOccupancyReport(LocalDate startDate, LocalDate endDate, Optional<Long> roomId) {
        List<RoomEntity> operationalRooms = roomRepository.findAll().stream()
                .filter(room -> !RoomStatus.MAINTENANCE.name().equals(room.status))
                .filter(room -> roomId.map(id -> id.equals(room.id)).orElse(true))
                .sorted(Comparator.comparing(room -> room.roomNumber))
                .toList();

        if (operationalRooms.isEmpty()) {
            return new OccupancyReport(
                    startDate,
                    endDate,
                    roomId.orElse(null),
                    0,
                    0,
                    0,
                    0,
                    BigDecimal.ZERO,
                    BigDecimal.ZERO,
                    List.of(),
                    true
            );
        }

        Set<Long> operationalRoomIds = operationalRooms.stream().map(room -> room.id).collect(Collectors.toSet());
        LocalDate endExclusive = endDate.plusDays(1);

        List<BookedRoomEntity> bookedRooms = bookedRoomRepository.findForReport(startDate, endExclusive, REPORT_BOOKING_STATUSES);
        Set<Long> bookingsCoveredByBookedRooms = new HashSet<>();
        Set<String> occupiedRoomDates = new HashSet<>();

        for (BookedRoomEntity bookedRoom : bookedRooms) {
            if (bookedRoom.room == null || !operationalRoomIds.contains(bookedRoom.room.id)) {
                continue;
            }

            if (bookedRoom.booking != null) {
                bookingsCoveredByBookedRooms.add(bookedRoom.booking.id);
            }

            markOccupiedDates(occupiedRoomDates, bookedRoom.room.id, bookedRoom.checkin, bookedRoom.checkout, startDate, endExclusive);
        }

        List<BookingJpaEntity> bookings = bookingRepository.findForReport(startDate, endExclusive, REPORT_BOOKING_STATUSES);
        for (BookingJpaEntity booking : bookings) {
            if (bookingsCoveredByBookedRooms.contains(booking.id)) {
                continue;
            }

            if (booking.room == null || !operationalRoomIds.contains(booking.room.id)) {
                continue;
            }

            markOccupiedDates(occupiedRoomDates, booking.room.id, booking.checkIn, booking.checkOut, startDate, endExclusive);
        }

        List<DailyOccupancyPoint> dailyOccupancy = new ArrayList<>();
        long occupiedRoomDays = 0;
        LocalDate current = startDate;

        while (!current.isAfter(endDate)) {
            int occupiedRooms = 0;
            for (RoomEntity room : operationalRooms) {
                if (occupiedRoomDates.contains(buildRoomDateKey(room.id, current))) {
                    occupiedRooms++;
                }
            }

            int availableRooms = Math.max(operationalRooms.size() - occupiedRooms, 0);
            occupiedRoomDays += occupiedRooms;

            dailyOccupancy.add(new DailyOccupancyPoint(
                    current,
                    occupiedRooms,
                    availableRooms,
                    percentage(occupiedRooms, operationalRooms.size()),
                    percentage(availableRooms, operationalRooms.size())
            ));
            current = current.plusDays(1);
        }

        long totalRoomDays = (long) operationalRooms.size() * dailyOccupancy.size();
        long availableRoomDays = Math.max(totalRoomDays - occupiedRoomDays, 0);

        return new OccupancyReport(
                startDate,
                endDate,
                roomId.orElse(null),
                operationalRooms.size(),
                totalRoomDays,
                occupiedRoomDays,
                availableRoomDays,
                percentage(occupiedRoomDays, totalRoomDays),
                percentage(availableRoomDays, totalRoomDays),
                dailyOccupancy,
                true
        );
    }

    private void markOccupiedDates(Set<String> occupiedRoomDates,
                                   Long roomId,
                                   LocalDate fromDate,
                                   LocalDate toDate,
                                   LocalDate reportStartDate,
                                   LocalDate reportEndExclusive) {
        LocalDate effectiveStart = fromDate.isBefore(reportStartDate) ? reportStartDate : fromDate;
        LocalDate effectiveEnd = toDate.isAfter(reportEndExclusive) ? reportEndExclusive : toDate;

        LocalDate current = effectiveStart;
        while (current.isBefore(effectiveEnd)) {
            occupiedRoomDates.add(buildRoomDateKey(roomId, current));
            current = current.plusDays(1);
        }
    }

    private String buildRoomDateKey(Long roomId, LocalDate date) {
        return roomId + ":" + date;
    }

    private BigDecimal defaultAmount(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }

    private BigDecimal divide(BigDecimal numerator, BigDecimal denominator) {
        if (denominator.signum() == 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }
        return numerator.divide(denominator, 2, RoundingMode.HALF_UP);
    }

    private BigDecimal percentage(long numerator, long denominator) {
        if (denominator <= 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return BigDecimal.valueOf(numerator)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(denominator), 2, RoundingMode.HALF_UP);
    }

    private static final class RoomRevenueAccumulator {
        private final Long roomId;
        private final String roomNumber;
        private BigDecimal revenue;
        private long billCount;

        private RoomRevenueAccumulator(Long roomId, String roomNumber, BigDecimal revenue, long billCount) {
            this.roomId = roomId;
            this.roomNumber = roomNumber;
            this.revenue = revenue;
            this.billCount = billCount;
        }
    }
}
