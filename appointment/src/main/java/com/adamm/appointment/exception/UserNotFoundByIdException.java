package com.adamm.appointment.exception;

public class UserNotFoundByIdException extends RuntimeException {

    public UserNotFoundByIdException(Long id) {
        super("User not found with id: " + id);
    }
}
