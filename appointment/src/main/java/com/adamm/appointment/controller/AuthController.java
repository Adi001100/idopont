package com.adamm.appointment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamm.appointment.dto.UserCreateDTO;
import com.adamm.appointment.dto.UserInfoDTO;
import com.adamm.appointment.dto.UserLoginDTO;
import com.adamm.appointment.service.AuthService;

import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping("api/auth")
@Slf4j
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserInfoDTO> register(@RequestBody UserCreateDTO createDTO) {
        log.info("POST request at /api/user with body:", createDTO.toString());
        UserInfoDTO userInfoDTO = authService.createUser(createDTO);
        log.info("User created");
        return new ResponseEntity<>(userInfoDTO, HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginDTO loginDTO) {
        log.info("POST request at /api/user with body:", loginDTO.toString());
        String token = authService.login(loginDTO);
        log.info("Successful login:", loginDTO.email());
        return ResponseEntity.ok(token);
    }
}
