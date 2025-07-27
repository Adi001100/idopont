package com.adamm.appointment.dto;

import com.adamm.appointment.domain.User;

import lombok.Getter;

@Getter
public class UserInfoDTO {

    private final String fullName;
    private final String email;

    public UserInfoDTO(User user) {
        this.fullName = user.getFullName();
        this.email = user.getEmail();
    }
}
