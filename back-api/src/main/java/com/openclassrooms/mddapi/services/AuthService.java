package com.openclassrooms.mddapi.services;


import com.openclassrooms.mddapi.dto.AuthRequestDTO;
import com.openclassrooms.mddapi.dto.AuthResponseDTO;
import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.dto.UserResponseDTO;
import com.openclassrooms.mddapi.models.UserEntity;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;


@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final com.openclassrooms.mddapi.services.JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseDTO register(RegisterRequest request) {
        var user = UserEntity.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .createdAt(LocalDate.now())
                .updatedAt(LocalDate.now())
                .build();
        userService.createNewUser(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthResponseDTO.builder()
                .bearerToken(jwtToken)
                .build();
    }

    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userService.getUserByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(user);
        return AuthResponseDTO.builder()
                .bearerToken(jwtToken)
                .build();
    }

    public UserResponseDTO getCurrentUser(@NonNull HttpServletRequest request) throws ServletException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ServletException();
        }
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUserEmail(jwt);
        if (userEmail != null) {
            UserEntity user = userService.getUserByEmail(userEmail);
            if (jwtService.isTokenValid(jwt, userEmail)) {
                return userService.mapUserEntityToDTO(user);
            }
        }
        throw new ServletException();
    }
}
