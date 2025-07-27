package com.adamm.appointment.exception;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.json.JsonParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ValidationError>> handleValidationError(MethodArgumentNotValidException exception) {
        List<ValidationError> validationErrors = exception.getFieldErrors()
                .stream()
                .map(fieldError -> new ValidationError(fieldError.getField(), fieldError.getDefaultMessage()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(JsonParseException.class)
    public ResponseEntity<ApiError> handleJsonParseException(JsonParseException ex) {
        log.error("Request JSON could no be parsed: ", ex);
        HttpStatus status = HttpStatus.BAD_REQUEST;

        ApiError body = new ApiError("JSON_PARSE_ERROR", "The request could not be parsed as a valid JSON.", ex.getLocalizedMessage());

        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.error("Illegal argument error: ", ex);
        HttpStatus status = HttpStatus.BAD_REQUEST;

        ApiError body = new ApiError("ILLEGAL_ARGUMENT_ERROR", "An illegal argument has been passed to the method.", ex.getLocalizedMessage());

        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<ApiError> defaultErrorHandler(Throwable t) {
        log.error("An unexpected error occurred: ", t);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        ApiError body = new ApiError("UNCLASSIFIED_ERROR", "Oh, snap! Something really unexpected occurred.", t.getLocalizedMessage());

        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(UserEmailExistsException.class)
    public ResponseEntity<List<ValidationError>> handleEmailAlreadyExists(UserEmailExistsException exception) {
        log.error("E-mail already exists: ", exception);

        ValidationError validationError = new ValidationError("email", "E-mail already exists: " + exception.getEmail());
        return new ResponseEntity<>(List.of(validationError), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundByEmailException.class)
    public ResponseEntity<List<ValidationError>> handleEmailNotFound(UserNotFoundByEmailException exception) {
        log.error("User not found by email: ", exception);

        ValidationError validationError = new ValidationError("email", "User not found by email: " + exception.getEmail());
        return new ResponseEntity<>(List.of(validationError), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotActiveException.class)
    public ResponseEntity<List<ValidationError>> handleUserNotActive(UserNotActiveException exception) {
        log.error("User not active", exception);

        ValidationError validationError = new ValidationError("email", exception.getMessage());
        return new ResponseEntity<>(List.of(validationError), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserLockedException.class)
    public ResponseEntity<List<ValidationError>> handleUserNotActive(UserLockedException exception) {
        log.error("User Locked", exception);

        ValidationError validationError = new ValidationError("password", "User locked" + exception.getMessage());
        return new ResponseEntity<>(List.of(validationError), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<List<ValidationError>> handleInvalidCredentials(InvalidCredentialsException exception) {
        log.error("Invalid credentials", exception);

        ValidationError validationError = new ValidationError("password", exception.getPassword());
        return new ResponseEntity<>(List.of(validationError), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductNotFoundByIdException.class)
    public ResponseEntity<List<ValidationError>> handleProductNotFoundById(ProductNotFoundByIdException exception) {
        log.error("Product not found by id", exception);

        ValidationError validationError = new ValidationError("id", exception.getId().toString());
        return new ResponseEntity<>(List.of(validationError), HttpStatus.BAD_REQUEST);
    }
}
