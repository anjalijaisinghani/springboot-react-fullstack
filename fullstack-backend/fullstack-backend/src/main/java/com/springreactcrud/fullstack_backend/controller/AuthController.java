package com.springreactcrud.fullstack_backend.controller;

import com.springreactcrud.fullstack_backend.model.User;
import com.springreactcrud.fullstack_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;




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
        public ResponseEntity<String> login(@RequestBody User user) {

            Optional<User> existingUser = Optional.empty();

            if (user.getUsername() != null && !user.getUsername().isEmpty()) {
                existingUser = userRepository.findByUsername(user.getUsername());
            } else if (user.getEmail() != null && !user.getEmail().isEmpty()) {
                existingUser = userRepository.findByEmail(user.getEmail());
            }

            if (existingUser.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found!");
            }

            User dbUser = existingUser.get();

            if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid password!");
            }



            return ResponseEntity.ok("Login successful!");
        }
}