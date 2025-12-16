package com.adamm.appointment.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

import com.adamm.appointment.domain.User;
import com.adamm.appointment.dto.AuthenticatedUserInfoDTO;
import com.adamm.appointment.dto.UserAdminInfoDTO;
import com.adamm.appointment.dto.UserRoleUpdateDTO;
import com.adamm.appointment.enums.Role;
import com.adamm.appointment.exception.UserNotFoundByIdException;
import com.adamm.appointment.exception.UserNotFoundByEmailException;

import org.springframework.security.core.Authentication;

import com.adamm.appointment.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }    

    public AuthenticatedUserInfoDTO getMe(Authentication authentication){
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                                    .orElseThrow(() -> new UserNotFoundByEmailException(email));;
        return new AuthenticatedUserInfoDTO(user);
    }

    public List<UserAdminInfoDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserAdminInfoDTO::new)
                .toList();
    }

    public UserAdminInfoDTO updateUserRole(Long id, UserRoleUpdateDTO roleUpdateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundByIdException(id));

        Role newRole = roleUpdateDTO.role();
        user.setRole(newRole);
        return new UserAdminInfoDTO(userRepository.save(user));
    }
}
