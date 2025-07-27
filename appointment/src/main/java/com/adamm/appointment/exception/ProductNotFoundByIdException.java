package com.adamm.appointment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProductNotFoundByIdException extends RuntimeException {

    public final Long id;

}
