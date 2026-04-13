package com.hotel.backend.adapter.in.web.dto;

import java.math.BigDecimal;

public record ServiceCatalogResponse(
        Integer id,
        String name,
        String unit,
        BigDecimal price
) {
}
