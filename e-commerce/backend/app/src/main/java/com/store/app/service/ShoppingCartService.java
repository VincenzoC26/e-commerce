package com.store.app.service;

import com.store.app.model.Product;
import com.store.app.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ShoppingCartService {

    @Autowired
    private final ProductRepository productRepository;

    private LinkedList<Product> productsInCart;

    @Transactional
    public void addProductToShoppingCart(Long productId) {
        Optional<Product> optionalProduct = productRepository
                .findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new IllegalStateException("product with id: "
                    + productId
                    + " doesn't exist");
        }
        productsInCart.add(optionalProduct.get());
    }

    public List<Product> getProductsInShoppingCart() {
        return productsInCart;
    }

    public void removeProductFromShoppingCart(Long productId) {
        Optional<Product> optionalProduct = productRepository
                .findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new IllegalStateException("product with id: "
                    + productId
                    + " doesn't exist");
        }
        productsInCart.remove(optionalProduct.get());
    }

    public void removeAllProductsFromShoppingCart() {
        productsInCart.clear();
    }




}
