package com.ecommerce.adminservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.adminservice.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
