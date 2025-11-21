package com.ecommerce.customerservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.customerservice.entity.Order;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
    List<Order> findBySellerId(Long sellerId);
}

