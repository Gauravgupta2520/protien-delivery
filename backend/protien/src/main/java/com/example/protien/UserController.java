package com.example.protien;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // *******************************
    // SIGNUP API (Public)
    // *******************************
    @PostMapping("/signup")
    public ApiResponse signup(@RequestBody User user) {
        logger.info("Signup attempt for email={}", user.getEmail());
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            logger.warn("Signup attempt with missing password for email={}", user.getEmail());
            return new ApiResponse(false, "Password is required");
        }
        if (userService.userExists(user.getEmail())) {
            logger.info("Signup failed - user already exists for email={}", user.getEmail());
            return new ApiResponse(false, "User already exists");
        }

        userService.saveUser(user);
        logger.info("User created successfully for email={}", user.getEmail());
        return new ApiResponse(true, "User created successfully");
    }

    // *******************************
    // LOGIN API (Public)
    // *******************************
    @PostMapping("/login")
    public ApiResponse login(@RequestBody User loginUser) {
        logger.info("Login attempt for email={}", loginUser.getEmail());
        User dbUser = userService.getUserByEmail(loginUser.getEmail());

        logger.info("User lookup for email={} returned={}", loginUser.getEmail(), dbUser != null);

        if (dbUser == null) {
            logger.info("Login failed - user not found for email={}", loginUser.getEmail());
            return new ApiResponse(false, "User not found");
        }

        // Defensive null-check to avoid NPE (password may be null if not provided/stored)
        if (dbUser.getPassword() != null && dbUser.getPassword().equals(loginUser.getPassword())) {
            String token = jwtUtil.generateToken(dbUser.getEmail());
            logger.info("Login successful for email={}", dbUser.getEmail());
            return new ApiResponse(true, "Login successful", token);
        }

        logger.info("Login failed - invalid password or missing password for email={}", loginUser.getEmail());
        return new ApiResponse(false, "Invalid username or password");
    }

    // *******************************
    // GET ALL USERS (Protected)
    // *******************************
    @GetMapping("/")
    public ApiResponse getAllUsers(org.springframework.security.core.Authentication authentication) {
        // If Spring Security allowed the request through, Authentication will be present and valid
        if (authentication != null && authentication.isAuthenticated()) {
            logger.info("getAllUsers called by={}", authentication.getName());
            List<User> users = userService.getAllUsers();
            return new ApiResponse(true, "Users fetched successfully", users);
        }
        return new ApiResponse(false, "Access denied: Invalid or missing token");
    }

    // -------------------------------
    // GET — Fetch user by ID (protected)
    // -------------------------------
    @GetMapping("/{id}")
    public ApiResponse getUserById(@org.springframework.web.bind.annotation.PathVariable Long id,
                                   org.springframework.security.core.Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            logger.info("getUserById called by={} for id={}", authentication.getName(), id);
            User user = userService.getUserById(id);
            if (user == null) {
                return new ApiResponse(false, "User not found");
            }
            return new ApiResponse(true, "User fetched successfully", user);
        }
        return new ApiResponse(false, "Access denied: Invalid or missing token");
    }

    // -------------------------------
    // DEBUG — Check whether a persisted user has a stored password (dev-only)
    // -------------------------------
    @GetMapping("/debug/password")
    public ApiResponse debugPassword(@RequestParam String email) {
        logger.info("Debug password check for email={}", email);
        User u = userService.getUserByEmail(email);
        if (u == null) {
            return new ApiResponse(false, "User not found");
        }
        boolean hasPwd = u.getPassword() != null && !u.getPassword().isEmpty();
        return new ApiResponse(true, hasPwd ? "User has password" : "User missing password", hasPwd);
    }

    // -------------------------------
    // DEBUG — Set or update a user's password (dev-only)
    // -------------------------------
    @PostMapping("/debug/set-password")
    public ApiResponse debugSetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String pwd = body.get("password");
        if (email == null || pwd == null) {
            return new ApiResponse(false, "email and password are required in body");
        }
        User u = userService.getUserByEmail(email);
        if (u == null) {
            return new ApiResponse(false, "User not found");
        }
        u.setPassword(pwd);
        userService.saveUser(u);
        logger.info("Debug: password updated for email={}", email);
        return new ApiResponse(true, "Password updated");
    }

    // *******************************
    // ApiResponse Inner Class
    // *******************************
    public static class ApiResponse {
        private boolean success;
        private String message;
        private Object data;

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public ApiResponse(boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        // Getters and setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public Object getData() { return data; }
        public void setData(Object data) { this.data = data; }
    }
}
