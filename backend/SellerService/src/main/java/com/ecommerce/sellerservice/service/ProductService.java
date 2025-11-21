package com.ecommerce.sellerservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.sellerservice.entity.Product;
import com.ecommerce.sellerservice.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product addProduct(Product product) {
        return repository.save(product);
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public List<Product> getProductsBySeller(Long sellerId) {
        return repository.findBySellerId(sellerId);
    }

    public Product getProductById(Long id) {
        return repository.findById(id).orElse(null);
    }
}

