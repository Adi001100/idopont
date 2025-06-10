package com.adamm.appointment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamm.appointment.service.UserService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
 