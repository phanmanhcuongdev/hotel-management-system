package com.hotel.backend.adapter.in.web;

import com.hotel.backend.adapter.in.web.dto.ClientBookingHistoryItemResponse;
import com.hotel.backend.adapter.in.web.dto.ClientDetailResponse;
import com.hotel.backend.adapter.in.web.dto.ClientSummaryResponse;
import com.hotel.backend.application.domain.model.Client;
import com.hotel.backend.application.domain.model.ClientBookingHistoryItem;
import com.hotel.backend.application.domain.model.ClientDetails;

public final class ClientWebMapper {

    private ClientWebMapper() {
    }

    public static ClientSummaryResponse toSummaryResponse(Client client) {
        return new ClientSummaryResponse(
                client.id(),
                client.idCardNumber(),
                client.fullName(),
                client.address(),
                client.email(),
                client.phoneNumber(),
                client.description(),
                client.needsReview()
        );
    }

    public static ClientDetailResponse toDetailResponse(ClientDetails details) {
        return new ClientDetailResponse(
                details.client().id(),
                details.client().idCardNumber(),
                details.client().fullName(),
                details.client().address(),
                details.client().email(),
                details.client().phoneNumber(),
                details.client().description(),
                details.client().needsReview(),
                details.bookingHistory().stream().map(ClientWebMapper::toHistoryResponse).toList()
        );
    }

    private static ClientBookingHistoryItemResponse toHistoryResponse(ClientBookingHistoryItem item) {
        return new ClientBookingHistoryItemResponse(
                item.bookingId(),
                item.guestName(),
                item.roomId(),
                item.roomNumber(),
                item.checkIn(),
                item.checkOut(),
                item.status().name(),
                item.checkedIn()
        );
    }
}
