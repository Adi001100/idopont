package com.adamm.appointment.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendResetLink(String email, String resetToken) {
        // Logic to send password reset email
        System.out.println("Reset link elküldve: " + resetToken);
    }

}
