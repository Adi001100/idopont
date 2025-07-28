package com.adamm.appointment.dto;

import lombok.Getter;

@Getter
public class JwtResponseDTO {

    private final String name = "token";
    private final String token;

    

    public JwtResponseDTO(String token) {
        this.token = token;
    }

}
