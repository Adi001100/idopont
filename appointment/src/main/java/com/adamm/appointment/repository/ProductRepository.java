package com.adamm.appointment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adamm.appointment.domain.Product;
import com.adamm.appointment.dto.ProductInfoDTO;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByActiveTrue();

}
