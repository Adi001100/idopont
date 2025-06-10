package com.adamm.appointment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserExistsException extends RuntimeException {

    private final String email;

}
