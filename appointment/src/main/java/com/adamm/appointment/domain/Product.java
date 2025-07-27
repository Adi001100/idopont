package com.adamm.appointment.domain;

import com.adamm.appointment.dto.ProductCreateDTO;
import com.adamm.appointment.dto.ProductUpdateDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer durationMinutes;
    private Integer price;
    private Boolean active;

    public Product(ProductCreateDTO createDTO) {
        this.name = createDTO.name();
        this.durationMinutes = createDTO.durationMinutes();
        this.price = createDTO.price();
        this.active = true;
    }

    public Product update(ProductUpdateDTO updateDTO){
        this.name = updateDTO.name();
        this.durationMinutes = updateDTO.durationMinutes();
        this.price = updateDTO.price();
        return this;
    }
}
