package com.ecommerce.adminservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ecommerce.adminservice.dto.LoginResponse;
import com.ecommerce.adminservice.entity.Admin;
import com.ecommerce.adminservice.repository.AdminRepository;

@Service
public class AdminService {

    private final AdminRepository repository;
    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin";

    public AdminService(AdminRepository repository) {
        this.repository = repository;
    }

    public LoginResponse login(String username, String password) {
        if (ADMIN_USERNAME.equals(username) && ADMIN_PASSWORD.equals(password)) {
            String token = "admin-token-" + UUID.randomUUID().toString();
            return new LoginResponse(true, "Login successful", token);
        }
        return new LoginResponse(false, "Invalid credentials", null);
    }

    public Admin createAdmin(Admin admin) {
        return repository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return repository.findAll();
    }
}
