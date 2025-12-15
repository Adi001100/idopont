package com.adamm.appointment.service;

import java.time.Instant;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


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

    public AuthTokens login(UserLoginDTO loginDTO) {
        String email = loginDTO.email();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, loginDTO.password()));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundByEmailException(email));

        checkUserCanLogin(user);

        user.setLastLogin(Instant.now());
        userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthTokens(accessToken, refreshToken);
    }

    public AuthTokens refresh(String refreshToken) {
        String username = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundByEmailException(username));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            throw new InvalidCredentialsException("Invalid refresh token");
        }

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user);
        return new AuthTokens(newAccessToken, newRefreshToken);
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
