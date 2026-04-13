package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.BillDetailResponse;
import com.hotel.backend.adapter.in.web.dto.BillLedgerItemResponse;
import com.hotel.backend.adapter.in.web.dto.BillSummaryResponse;
import com.hotel.backend.adapter.in.web.dto.CreateBillRequest;
import com.hotel.backend.application.domain.exception.ResourceNotFoundException;
import com.hotel.backend.application.domain.model.PaymentType;
import com.hotel.backend.application.port.in.CreateBookingBillCommand;
import com.hotel.backend.application.port.in.CreateBookingBillUseCase;
import com.hotel.backend.application.port.in.GetBillDetailUseCase;
import com.hotel.backend.application.port.in.GetBillsQuery;
import com.hotel.backend.application.port.in.GetBillsUseCase;
import com.hotel.backend.application.port.in.GetBookingBillUseCase;
import com.hotel.backend.config.WebAdapter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@WebAdapter
@RequestMapping
@RequiredArgsConstructor
public class BillController {

    private final GetBookingBillUseCase getBookingBillUseCase;
    private final CreateBookingBillUseCase createBookingBillUseCase;
    private final GetBillsUseCase getBillsUseCase;
    private final GetBillDetailUseCase getBillDetailUseCase;

    @GetMapping("/api/bills")
    @PreAuthorize("hasRole('ADMIN')")
    public List<BillLedgerItemResponse> getBills(@RequestParam Optional<String> keyword,
                                                 @RequestParam Optional<Long> bookingId,
                                                 @RequestParam Optional<String> paymentType,
                                                 @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate paymentDateFrom,
                                                 @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate paymentDateTo) {
        GetBillsQuery query = new GetBillsQuery(
                keyword.map(String::trim).filter(value -> !value.isBlank()),
                bookingId,
                parsePaymentType(paymentType),
                Optional.ofNullable(paymentDateFrom),
                Optional.ofNullable(paymentDateTo)
        );

        return getBillsUseCase.getBills(query).stream()
                .map(BillWebMapper::toResponse)
                .toList();
    }

    @GetMapping("/api/bills/{billId}")
    @PreAuthorize("hasRole('ADMIN')")
    public BillDetailResponse getBillDetail(@PathVariable Integer billId) {
        return getBillDetailUseCase.getBillDetail(billId)
                .map(BillWebMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found"));
    }

    @GetMapping("/api/bookings/{bookingId}/bill")
    @PreAuthorize("hasRole('ADMIN')")
    public BillSummaryResponse getBookingBill(@PathVariable Long bookingId) {
        return BillWebMapper.toResponse(getBookingBillUseCase.getBookingBill(bookingId));
    }

    @PostMapping("/api/bookings/{bookingId}/bill")
    @PreAuthorize("hasRole('ADMIN')")
    public BillSummaryResponse createBookingBill(@PathVariable Long bookingId,
                                                 @Valid @RequestBody CreateBillRequest request,
                                                 Authentication authentication) {
        return BillWebMapper.toResponse(createBookingBillUseCase.createBookingBill(
                new CreateBookingBillCommand(
                        bookingId,
                        request.paymentType(),
                        request.note(),
                        authentication.getName()
                )
        ));
    }

    private Optional<PaymentType> parsePaymentType(Optional<String> paymentType) {
        if (paymentType.isEmpty() || paymentType.get().isBlank()) {
            return Optional.empty();
        }

        try {
            return Optional.of(PaymentType.fromValue(paymentType.get()));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Invalid paymentType value: " + paymentType.get());
        }
    }
}
