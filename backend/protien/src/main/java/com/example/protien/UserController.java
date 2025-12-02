package com.example.protien;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // *******************************
    // SIGNUP API (Public)
    // *******************************
    @PostMapping("/signup")
    public ApiResponse signup(@RequestBody User user) {
        if (userService.userExists(user.getEmail())) {
            return new ApiResponse(false, "User already exists");
        }

        userService.saveUser(user);
        return new ApiResponse(true, "User created successfully");
    }

    // *******************************
    // LOGIN API (Public)
    // *******************************
    @PostMapping("/login")
    public ApiResponse login(@RequestBody User loginUser) {
        User dbUser = userService.getUserByEmail(loginUser.getEmail());

        if (dbUser == null) {
            return new ApiResponse(false, "User not found");
        }

        if (dbUser.getPassword().equals(loginUser.getPassword())) {
            String token = jwtUtil.generateToken(dbUser.getEmail());
            return new ApiResponse(true, "Login successful", token);
        }

        return new ApiResponse(false, "Invalid username or password");
    }

    // *******************************
    // GET ALL USERS (Protected Example)
    // *******************************
    @GetMapping("/")
    public ApiResponse getAllUsers(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                List<User> users = userService.getAllUsers();
                return new ApiResponse(true, "Users fetched successfully", users);
            }
        }
        return new ApiResponse(false, "Access denied: Invalid or missing token");
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
