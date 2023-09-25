package com.store.app.controller;

import com.store.app.model.Product;
import com.store.app.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/shoppingCart")
@AllArgsConstructor
public class ShoppingCartController {

    @Autowired
    private final ShoppingCartService shoppingCartService;

    @PostMapping("/add")
    public void addProductToShoppingCart(@RequestParam Long productId) {
        shoppingCartService.addProductToShoppingCart(productId);
    }
    @GetMapping("/get")
    public List<Product> getProductsInShoppingCart() {
        return shoppingCartService.getProductsInShoppingCart();
    }

    @DeleteMapping("/delete")
    public void removeProductFromShoppingCart(@RequestParam Long productId) {
        shoppingCartService.removeProductFromShoppingCart(productId);
    }
}
