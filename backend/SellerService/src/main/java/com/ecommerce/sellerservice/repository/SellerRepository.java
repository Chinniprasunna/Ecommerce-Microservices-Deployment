package com.ecommerce.sellerservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.sellerservice.entity.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByUsername(String username);
}
