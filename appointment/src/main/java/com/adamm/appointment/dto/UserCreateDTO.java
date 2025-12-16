package com.adamm.appointment.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserCreateDTO(

        @NotBlank(message = "First name is required")
        @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
        String fullName,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Password is required")
        String password,

        @NotBlank(message = "Phone number is required")
        @Pattern(regexp = "\\+?[0-9]{7,15}", message = "Invalid phone number format")
        String phone,

        @NotBlank(message = "Address is required")
        String address,

        @NotBlank(message = "Billing address is required")
        String billingAddress
        
        ) {

}
