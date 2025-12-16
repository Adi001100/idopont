package com.adamm.appointment.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamm.appointment.dto.AuthTokens;
import com.adamm.appointment.dto.UserCreateDTO;
import com.adamm.appointment.dto.UserInfoDTO;
import com.adamm.appointment.dto.UserLoginDTO;
import com.adamm.appointment.config.JwtService;
import com.adamm.appointment.service.AuthService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/auth")
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserInfoDTO> register(@RequestBody UserCreateDTO createDTO) {
        log.info("POST request at /api/user with body:", createDTO.toString());
        UserInfoDTO userInfoDTO = authService.createUser(createDTO);
        log.info("User created");
        return new ResponseEntity<>(userInfoDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody UserLoginDTO loginDTO) {
        log.info("POST request at /api/user with body:", loginDTO.toString());
        AuthTokens tokens = authService.login(loginDTO);
        log.info("Successful login:", loginDTO.email());

        return ResponseEntity.ok()
                .headers((HttpHeaders) buildAuthCookies(tokens))
                .build();

    }

    @GetMapping("/refresh")
    public ResponseEntity<Void> refresh(@CookieValue("refresh_token") String refreshToken) {
        AuthTokens tokens = authService.refresh(refreshToken);
        return ResponseEntity.ok()
                .headers((HttpHeaders) buildAuthCookies(tokens))
                .build();
    }

    @GetMapping("/check")
    public ResponseEntity<Void> checkAuth() {
        // Ha idáig eljut, akkor a JWT érvényes
        return ResponseEntity.ok().build();
    }

    private MultiValueMap<String, String> buildAuthCookies(AuthTokens tokens) {
        HttpHeaders headers = new HttpHeaders();
        ResponseCookie accessCookie = jwtService.buildAccessTokenCookie(tokens.accessToken());
        ResponseCookie refreshCookie = jwtService.buildRefreshTokenCookie(tokens.refreshToken());
        headers.add(HttpHeaders.SET_COOKIE, accessCookie.toString());
        headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());
        return headers;
    }
}
