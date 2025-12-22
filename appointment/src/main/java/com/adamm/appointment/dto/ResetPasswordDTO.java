package com.adamm.appointment.dto;

public record ResetPasswordDTO(
    String token,
    String newPassword,
    String confirmNewPassword
) {

}
