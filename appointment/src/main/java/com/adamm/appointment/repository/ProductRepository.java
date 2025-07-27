package com.adamm.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adamm.appointment.domain.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
