package com.springreactcrud.fullstack_backend.controller;

import com.springreactcrud.fullstack_backend.model.User;
import com.springreactcrud.fullstack_backend.repository.UserRepository;

import com.springreactcrud.fullstack_backend.security.JwtUtil;
import com.springreactcrud.fullstack_backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        if (user.getUsername() == null || user.getEmail() == null || user.getPassword() == null || user.getName() == null) {
            return ResponseEntity.badRequest().body("All fields are required!");
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }


        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody User user) {
//
//        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
//
//        if (existingUser.isEmpty()) {
//            return ResponseEntity.badRequest().body("User not found!");
//        }
//
//        User dbUser = existingUser.get();
//
//        boolean passwordMatch = passwordEncoder.matches(user.getPassword(), dbUser.getPassword());
//
//        System.out.println("Password match: " + passwordMatch);
//
//        if (!passwordMatch) {
//            return ResponseEntity.badRequest().body("Invalid password!");
//        }
//
//        return ResponseEntity.ok("Login successful!");
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        String usernameOrEmail = user.getUsername() != null && !user.getUsername().isEmpty()
                ? user.getUsername()
                : user.getEmail();

        if (usernameOrEmail == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username/email and password are required!");
        }

        // Authenticate using Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usernameOrEmail, user.getPassword())
        );

        // Load user details
        UserDetails userDetails = userDetailsService.loadUserByUsername(usernameOrEmail);

        // Generate JWT
        String token = jwtUtil.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "username", userDetails.getUsername()
        ));
        }
}