package com.adamm.appointment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserLockedException extends RuntimeException {

    private final String message = "Túl sok hibás bejelentkezés miatt zárolva lett a felhasználója.";
}
