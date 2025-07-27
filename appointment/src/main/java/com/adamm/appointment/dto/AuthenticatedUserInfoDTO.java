package com.adamm.appointment.dto;

import com.adamm.appointment.domain.User;

import lombok.Getter;

@Getter
public class AuthenticatedUserInfoDTO {

    private final String fullName;
    private final String email;
    private final String password; // nem fix hogy kell
    private final String phone;
    private final String address;
    private final String billingAddress;

    public AuthenticatedUserInfoDTO(User user) {
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.password = "password";
        this.phone = user.getPhone();
        this.address = user.getAddress();
        this.billingAddress = user.getBillingAddress();
    }
}
