package com.adamm.appointment.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.adamm.appointment.domain.User;
import com.adamm.appointment.dto.UserCreateDTO;
import com.adamm.appointment.dto.UserInfoDTO;
import com.adamm.appointment.exception.UserExistsException;
import com.adamm.appointment.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserInfoDTO createUser(UserCreateDTO createDTO) {

        String email = createDTO.email();

        Optional<User> userToSearch = userRepository.findByEmail(email);

        if(!userToSearch.isEmpty()){
            if(userRepository.existsByEmail(email) ){ //&& userToSearch.get().getIsActive()
                throw new UserExistsException(email);
            }
            
        }
        
        User userToSave = new User(createDTO);
        userToSave.setPassword(passwordEncoder.encode(createDTO.password()));


        return new UserInfoDTO(userRepository.save(userToSave));
    }


}
