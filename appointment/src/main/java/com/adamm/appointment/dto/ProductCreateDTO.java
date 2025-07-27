package com.adamm.appointment.dto;

import jakarta.validation.constraints.NotBlank;

public record ProductCreateDTO(
    
        @NotBlank
        String name,

        @NotBlank
        Integer durationMinutes,

        @NotBlank
        Integer price
        ) {

}
