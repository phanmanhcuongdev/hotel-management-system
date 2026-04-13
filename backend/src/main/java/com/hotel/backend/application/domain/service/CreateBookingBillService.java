package com.hotel.backend.application.domain.service;

import com.hotel.backend.application.domain.exception.BusinessConflictException;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.BillSummary;
import com.hotel.backend.application.domain.model.Booking;
import com.hotel.backend.application.domain.model.BookingStatus;
import com.hotel.backend.application.domain.model.PaymentType;
import com.hotel.backend.application.domain.model.User;
import com.hotel.backend.application.port.in.CreateBookingBillCommand;
import com.hotel.backend.application.port.in.CreateBookingBillUseCase;
import com.hotel.backend.application.port.out.LoadBillSummaryPort;
import com.hotel.backend.application.port.out.LoadBookingPort;
import com.hotel.backend.application.port.out.SaveBillPort;
import com.hotel.backend.application.port.out.auth.LoadUserByUsernamePort;
import com.hotel.backend.config.UseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@RequiredArgsConstructor
public class CreateBookingBillService implements CreateBookingBillUseCase {

    private final LoadBookingPort loadBookingPort;
    private final LoadBillSummaryPort loadBillSummaryPort;
    private final SaveBillPort saveBillPort;
    private final LoadUserByUsernamePort loadUserByUsernamePort;

    @Override
    @Transactional
    public BillSummary createBookingBill(CreateBookingBillCommand command) {
        Booking booking = loadBookingPort.loadBookingById(command.bookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.status() != BookingStatus.COMPLETED) {
            throw new BusinessConflictException("Bill can only be created after checkout is completed");
        }

        BillSummary currentSummary = loadBillSummaryPort.loadBookingBillSummary(command.bookingId());
        if (currentSummary.billCreated()) {
            throw new BusinessConflictException("Bill already exists for this booking");
        }

        PaymentType paymentType = PaymentType.fromValue(command.paymentType());
        User actor = loadUserByUsernamePort.loadByUsername(command.actorUsername())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        return saveBillPort.createBill(command.bookingId(), actor.getId(), paymentType, normalizeNote(command.note()));
    }

    private String normalizeNote(String note) {
        if (note == null || note.isBlank()) {
            return null;
        }
        return note.trim();
    }
}
