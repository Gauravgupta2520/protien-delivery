package com.example.protien;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Save user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Check if user already exists
    public boolean userExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    // Fetch user for login
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
