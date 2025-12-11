package com.example.protien;

import java.io.IOException;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    
    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String requestPath = request.getRequestURI();
        logger.info("JwtFilter processing request: {} {}", request.getMethod(), requestPath);

        // Skip JWT validation for public endpoints (signup and login) and preflight OPTIONS
        if ("OPTIONS".equalsIgnoreCase(request.getMethod()) || requestPath.contains("/api/users/login") || requestPath.contains("/api/users/signup") || requestPath.contains("/api/users/debug")) {
            logger.info("Skipping JWT validation for public/preflight/debug endpoint: {} {}", request.getMethod(), requestPath);
            filterChain.doFilter(request, response);
            return;
        }

        // For protected endpoints, validate JWT
        String authHeader = request.getHeader("Authorization");
        logger.info("Authorization header present: {}", authHeader != null);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7).trim();
            logger.info("Token extracted, length: {}", token.length());

            try {
                boolean isValid = jwtUtil.validateToken(token);
                logger.info("Token validation result: {}", isValid);
                
                if (isValid) {
                    String email = jwtUtil.extractEmail(token);
                    logger.info("Token email extracted: {}", email);

                    // Create Authentication object
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    new ArrayList<>()  // empty roles for now
                            );

                    // Set authentication in SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("✅ Authentication set for user: {}", email);
                } else {
                    logger.warn("❌ JWT Token validation failed (expired or invalid)");
                }
            } catch (Exception e) {
                logger.error("❌ JWT Error: {}", e.getMessage());
                logger.error("Exception details:", e);
            }
        } else {
            logger.warn("⚠️  No Bearer token found for protected endpoint: {}", requestPath);
        }

        filterChain.doFilter(request, response);
    }
}
