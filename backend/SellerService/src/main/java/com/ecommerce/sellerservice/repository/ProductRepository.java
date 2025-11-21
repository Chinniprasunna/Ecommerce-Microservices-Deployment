package com.ecommerce.sellerservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.sellerservice.entity.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerId(Long sellerId);
}

