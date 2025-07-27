package com.adamm.appointment.service;

import java.time.Instant;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.adamm.appointment.config.JwtUtil;
import com.adamm.appointment.domain.User;
import com.adamm.appointment.dto.UserCreateDTO;
import com.adamm.appointment.dto.UserInfoDTO;
import com.adamm.appointment.dto.UserLoginDTO;
import com.adamm.appointment.exception.InvalidCredentialsException;
import com.adamm.appointment.exception.UserEmailExistsException;
import com.adamm.appointment.exception.UserLockedException;
import com.adamm.appointment.exception.UserNotActiveException;
import com.adamm.appointment.exception.UserNotFoundByEmailException;
import com.adamm.appointment.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public UserInfoDTO createUser(UserCreateDTO createDTO) {
        String email = createDTO.email();

        Optional<User> userToSearch = userRepository.findByEmail(email);

        if (!userToSearch.isEmpty()) {
            if (userRepository.existsByEmail(email)) { //&& userToSearch.get().getIsActive()
                throw new UserEmailExistsException(email);
            }
        }

        User userToSave = new User(createDTO);
        userToSave.setPassword(passwordEncoder.encode(createDTO.password()));

        return new UserInfoDTO(userRepository.save(userToSave));
    }

    public String login(UserLoginDTO loginDTO) {
        String email = loginDTO.email();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundByEmailException(email));

        checkUserCanLogin(user);

        if (!passwordEncoder.matches(loginDTO.password(), user.getPassword())){
            user.setFailedLoginAttempts(user.getFailedLoginAttempts()+1);
            userRepository.save(user);
            throw new InvalidCredentialsException("Nem megfelelő belépési adatok");
        }

        user.setLastLogin(Instant.now());
        userRepository.save(user);
        return jwtUtil.generateToken(user);
    }

    private void checkUserCanLogin(User user) {
        if (!user.getActive()) {
            throw new UserNotActiveException();
        }

        if (user.getLocked()) {
            throw new UserLockedException();
        }

        if (user.getFailedLoginAttempts() >= 3) {
            user.setLocked(true);
            userRepository.save(user);
            throw new UserLockedException();
        }
    }

}
