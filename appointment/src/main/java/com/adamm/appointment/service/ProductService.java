package com.adamm.appointment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adamm.appointment.domain.Product;
import com.adamm.appointment.dto.ProductCreateDTO;
import com.adamm.appointment.dto.ProductInfoDTO;
import com.adamm.appointment.dto.ProductUpdateDTO;
import com.adamm.appointment.exception.ProductNotFoundByIdException;
import com.adamm.appointment.repository.ProductRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public ProductInfoDTO create(ProductCreateDTO createDTO) {
        return new ProductInfoDTO(productRepository.save((new Product(createDTO))));
    }

    public List<ProductInfoDTO> getAll() {
        return productRepository.findAll()
                .stream()
                .map(product -> new ProductInfoDTO(product))
                .toList();
    }

    public List<ProductInfoDTO> getAllUserProduct() {
        //TODO
        return null;
    }

    public ProductInfoDTO update(Long id, ProductUpdateDTO updateDTO) {
        Product product = productRepository.findById(id)
                                        .orElseThrow(() -> new ProductNotFoundByIdException(id));
        return new ProductInfoDTO(product.update(updateDTO));
    }

    public void delete(Long id) {
        productRepository.findById(id)
                        .orElseThrow(() -> new ProductNotFoundByIdException(id))
                        .setActive(false);
                                       
    }

    //ezt ahhoz kell hogy ha törli a felhasználóját töröljük mellé az összes beállítását is
    public void deleteForever(){
        //TODO
    }
}
