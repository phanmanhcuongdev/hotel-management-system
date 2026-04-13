package com.hotel.backend.application.domain.model;

import java.math.BigDecimal;

public record ServiceCatalogItem(
        Integer id,
        String name,
        String unit,
        BigDecimal price
) {
}
