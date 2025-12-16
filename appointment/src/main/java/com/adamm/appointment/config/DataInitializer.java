package com.adamm.appointment.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.adamm.appointment.domain.User;
import com.adamm.appointment.enums.Role;
import com.adamm.appointment.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User fullAdmin = new User();
            fullAdmin.setFullName("Full Admin");
            fullAdmin.setEmail("admin@idopont.local");
            fullAdmin.setPassword(passwordEncoder.encode("ChangeMe123!"));
            fullAdmin.setRole(Role.FULL_ADMIN);
            fullAdmin.setActive(true);
            fullAdmin.setLocked(false);
            userRepository.save(fullAdmin);
        }
    }
}
