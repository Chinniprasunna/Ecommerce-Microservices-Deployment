package com.ecommerce.customerservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.customerservice.entity.Order;
import com.ecommerce.customerservice.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public Order placeOrder(Order order) {
        if (order.getTotalAmount() == null && order.getPrice() != null && order.getQuantity() != null) {
            order.setTotalAmount(order.getPrice() * order.getQuantity());
        }
        return repository.save(order);
    }

    public List<Order> getOrdersByCustomer(Long customerId) {
        return repository.findByCustomerId(customerId);
    }

    public List<Order> getOrdersBySeller(Long sellerId) {
        return repository.findBySellerId(sellerId);
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public Order getOrderById(Long id) {
        return repository.findById(id).orElse(null);
    }
}

