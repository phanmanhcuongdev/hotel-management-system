package com.hotel.backend.application.domain.model;

import java.util.Arrays;

public enum PaymentType {
    CASH(1),
    CARD(2),
    BANK_TRANSFER(3);

    private final int code;

    PaymentType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static PaymentType fromCode(int code) {
        return Arrays.stream(values())
                .filter(value -> value.code == code)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unsupported payment type code: " + code));
    }

    public static PaymentType fromValue(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("paymentType is required");
        }

        return PaymentType.valueOf(value.trim().toUpperCase());
    }
}
