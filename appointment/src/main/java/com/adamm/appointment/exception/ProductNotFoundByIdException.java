package com.adamm.appointment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProductNotFoundByIdException extends RuntimeException {

    private final Long id;

}
