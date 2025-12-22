package com.adamm.appointment.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordDTO(
    @NotBlank
    @Email
    String email
) {

}
