package com.ecommerce.customerservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.customerservice.dto.LoginRequest;
import com.ecommerce.customerservice.dto.LoginResponse;
import com.ecommerce.customerservice.entity.Customer;
import com.ecommerce.customerservice.entity.Order;
import com.ecommerce.customerservice.service.CustomerService;
import com.ecommerce.customerservice.service.OrderService;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final CustomerService service;
    private final OrderService orderService;

    public CustomerController(CustomerService service, OrderService orderService) {
        this.service = service;
        this.orderService = orderService;
    }

    @PostMapping("/register")
    public ResponseEntity<Customer> register(@RequestBody Customer customer) {
        return ResponseEntity.ok(service.register(customer));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request.getUsername(), request.getPassword()));
    }

    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        return ResponseEntity.ok(service.addCustomer(customer));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/hello")
    public String hello() {
        return "Customer Service Running!";
    }

    @PostMapping("/order/place")
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    @GetMapping("/order/customer/{customerId}")
    public ResponseEntity<List<Order>> getOrdersByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(orderService.getOrdersByCustomer(customerId));
    }

    @GetMapping("/order/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/order/seller/{sellerId}")
    public ResponseEntity<List<Order>> getOrdersBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(orderService.getOrdersBySeller(sellerId));
    }
}
