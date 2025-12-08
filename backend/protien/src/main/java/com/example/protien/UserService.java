package com.example.protien;

import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Save user (evict list and by-id caches since we added a new user)
    @CacheEvict(value = {"users", "userById"}, allEntries = true)
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Check if user already exists (NO caching - used during signup)
    public boolean userExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    // Fetch user for login (NO caching - used during login, password sensitive)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Fetch all users (with caching)
    @Cacheable(value = "users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Fetch a user by id (with caching)
    @Cacheable(value = "userById", key = "#id")
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
