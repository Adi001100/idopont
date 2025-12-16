package com.adamm.appointment.dto;

import com.adamm.appointment.domain.User;

import lombok.Getter;

@Getter
public class UserAdminInfoDTO {

    private final Long id;
    private final String fullName;
    private final String email;
    private final String role;
    private final Boolean active;
    private final Boolean locked;

    public UserAdminInfoDTO(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.role = user.getRole().name();
        this.active = user.getActive();
        this.locked = user.getLocked();
    }
}
