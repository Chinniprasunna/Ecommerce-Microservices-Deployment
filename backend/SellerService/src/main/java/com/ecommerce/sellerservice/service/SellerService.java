package com.ecommerce.sellerservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ecommerce.sellerservice.dto.LoginResponse;
import com.ecommerce.sellerservice.entity.Seller;
import com.ecommerce.sellerservice.repository.SellerRepository;

@Service
public class SellerService {

    private final SellerRepository repository;

    public SellerService(SellerRepository repository) {
        this.repository = repository;
    }

    public Seller register(Seller seller) {
        if (repository.findByUsername(seller.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }
        return repository.save(seller);
    }

    public LoginResponse login(String username, String password) {
        Seller seller = repository.findByUsername(username);
        if (seller != null && seller.getPassword().equals(password)) {
            String token = "seller-token-" + UUID.randomUUID().toString();
            return new LoginResponse(true, "Login successful", token, seller.getId());
        }
        return new LoginResponse(false, "Invalid credentials", null, null);
    }

    public Seller addSeller(Seller seller) {
        return repository.save(seller);
    }

    public List<Seller> getAllSellers() {
        return repository.findAll();
    }
}
