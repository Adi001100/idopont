package com.adamm.appointment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamm.appointment.dto.AuthenticatedUserInfoDTO;
import com.adamm.appointment.dto.UserAdminInfoDTO;
import com.adamm.appointment.dto.UserRoleUpdateDTO;
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

    @PreAuthorize("hasAuthority('FULL_ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserAdminInfoDTO>> listAllUsers() {
        log.info("GET request at /user");
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('FULL_ADMIN')")
    @PutMapping("/{id}/role")
    public ResponseEntity<UserAdminInfoDTO> updateUserRole(@PathVariable Long id, @RequestBody UserRoleUpdateDTO roleUpdateDTO) {
        log.info("PUT request at /user/{}/role", id);
        return new ResponseEntity<>(userService.updateUserRole(id, roleUpdateDTO), HttpStatus.OK);
    }

}
 