package com.adamm.appointment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserNotActiveException extends RuntimeException {

    private final String message = "A felhasználó nem aktív! A kiküldött aktiváló e-mail.bent található linkre kattintva tudod aktiválni.";
}
