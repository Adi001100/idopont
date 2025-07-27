package com.adamm.appointment.dto;

import com.adamm.appointment.domain.Product;

import lombok.Getter;

@Getter
public class ProductInfoDTO{

    private final Long id;
    private final String name;
    private final Integer durationMinutes;
    private final Integer price;


    public ProductInfoDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.durationMinutes = product.getDurationMinutes();
        this.price = product.getPrice();
    }
}
