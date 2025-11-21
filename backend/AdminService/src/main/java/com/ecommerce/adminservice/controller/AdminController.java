package com.ecommerce.adminservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.adminservice.dto.LoginRequest;
import com.ecommerce.adminservice.dto.LoginResponse;
import com.ecommerce.adminservice.entity.Admin;
import com.ecommerce.adminservice.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request.getUsername(), request.getPassword()));
    }

    @PostMapping("/create")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(service.createAdmin(admin));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(service.getAllAdmins());
    }

    @GetMapping("/hello")
    public String hello() {
        return "Admin Service Running!";
    }
}
