package com.store.app.controller;

import com.store.app.model.Product;
import com.store.app.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/products")
@AllArgsConstructor
public class ProductController {

    @Autowired
    private final ProductService productService;

    @GetMapping("/get")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/add")
    public void addNewProduct(@RequestBody Product product) {
        productService.addNewProduct(product);
    }

    @PostMapping("/addProducts")
    public void addNewProducts(@RequestBody List<Product> productList) {
        productService.addNewProducts(productList);
    }




}
