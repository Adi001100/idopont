package com.adamm.appointment.dto;

import com.adamm.appointment.domain.User;

import lombok.Getter;

@Getter
public class UserInfoDTO {

    private final String username;
    private final String email;

    public UserInfoDTO(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
