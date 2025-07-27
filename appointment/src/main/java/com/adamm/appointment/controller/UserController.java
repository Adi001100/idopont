package com.adamm.appointment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamm.appointment.dto.AuthenticatedUserInfoDTO;
import com.adamm.appointment.service.UserService;

import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<AuthenticatedUserInfoDTO> getCurrentUser(Authentication authentication) {
        log.info("GET request at /user/me: " + authentication.getName());
        AuthenticatedUserInfoDTO userInfo = userService.getMe(authentication);
        log.info("User info sent succesfully");
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }
    
}
 