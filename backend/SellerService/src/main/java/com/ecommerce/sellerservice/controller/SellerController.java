package com.ecommerce.sellerservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.sellerservice.dto.LoginRequest;
import com.ecommerce.sellerservice.dto.LoginResponse;
import com.ecommerce.sellerservice.entity.Product;
import com.ecommerce.sellerservice.entity.Seller;
import com.ecommerce.sellerservice.service.ProductService;
import com.ecommerce.sellerservice.service.SellerService;

@RestController
@RequestMapping("/seller")
public class SellerController {

    private final SellerService service;
    private final ProductService productService;

    public SellerController(SellerService service, ProductService productService) {
        this.service = service;
        this.productService = productService;
    }

    @PostMapping("/register")
    public ResponseEntity<Seller> register(@RequestBody Seller seller) {
        return ResponseEntity.ok(service.register(seller));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request.getUsername(), request.getPassword()));
    }

    @PostMapping("/add")
    public ResponseEntity<Seller> addSeller(@RequestBody Seller seller) {
        return ResponseEntity.ok(service.addSeller(seller));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Seller>> getAll() {
        return ResponseEntity.ok(service.getAllSellers());
    }

    @GetMapping("/hello")
    public String hello() {
        return "Seller Service Running!";
    }

    @PostMapping("/product/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @GetMapping("/product/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/product/seller/{sellerId}")
    public ResponseEntity<List<Product>> getProductsBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(productService.getProductsBySeller(sellerId));
    }
}

