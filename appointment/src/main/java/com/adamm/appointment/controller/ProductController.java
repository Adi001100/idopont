package com.adamm.appointment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adamm.appointment.dto.ProductCreateDTO;
import com.adamm.appointment.dto.ProductInfoDTO;
import com.adamm.appointment.dto.ProductUpdateDTO;
import com.adamm.appointment.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping("api/product")
@AllArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    @PreAuthorize("hasAuthority('FULL_ADMIN') or hasAuthority('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<ProductInfoDTO> create(@RequestBody ProductCreateDTO createDTO) {
        log.info("POST request at /product/create, with body: " + createDTO.toString());
        ProductInfoDTO infoDTO = productService.create(createDTO);
        log.info("Product has been created!");
        return new ResponseEntity<>(infoDTO, HttpStatus.CREATED);
    }
    

    // @PreAuthorize("hasAuthority('FULL_ADMIN')")
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<List<ProductInfoDTO>> getAll() {
        log.info("GET request at /product/getAll");
        List<ProductInfoDTO> resulDTOs = productService.getAll();
        log.info("All product has been listed!");
        return new ResponseEntity<>(resulDTOs, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('FULL_ADMIN') or hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ProductInfoDTO> update(@PathVariable Long id,
                                                 @RequestBody ProductUpdateDTO updateDTO){
        log.info("GET request at /product/update/" + id);
        ProductInfoDTO infoDTO = productService.update(id, updateDTO);
        log.info("Product " + id + "has been updated!");
        return new ResponseEntity<>(infoDTO, HttpStatus.ACCEPTED);
    }

    @PreAuthorize("hasAuthority('FULL_ADMIN') or hasAuthority('ADMIN')")
    @PostMapping("/delete/{id}")
    public ResponseEntity<ProductInfoDTO> delete(@PathVariable Long id){
        log.info("GET request at /product/delete/" + id);
        productService.delete(id);
        log.info("Product " + id + "has been deleted!");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
