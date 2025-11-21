package com.ecommerce.customerservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ecommerce.customerservice.dto.LoginResponse;
import com.ecommerce.customerservice.entity.Customer;
import com.ecommerce.customerservice.repository.CustomerRepository;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public Customer register(Customer customer) {
        if (repository.findByUsername(customer.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }
        return repository.save(customer);
    }

    public LoginResponse login(String username, String password) {
        Customer customer = repository.findByUsername(username);
        if (customer != null && customer.getPassword().equals(password)) {
            String token = "customer-token-" + UUID.randomUUID().toString();
            return new LoginResponse(true, "Login successful", token, customer.getId());
        }
        return new LoginResponse(false, "Invalid credentials", null, null);
    }

    public Customer addCustomer(Customer customer) {
        return repository.save(customer);
    }

    public List<Customer> getAll() {
        return repository.findAll();
    }
}
