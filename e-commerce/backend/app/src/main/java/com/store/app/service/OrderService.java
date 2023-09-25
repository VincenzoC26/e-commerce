package com.store.app.service;

import com.store.app.model.Product;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;


@Service
@AllArgsConstructor
public class OrderService {

    @Autowired
    private final ShoppingCartService shoppingCartService;

    private LinkedList<Product> order;

    public List<Product> createOrder() {
        if(!shoppingCartService.getProductsInShoppingCart().isEmpty()){
            order.addAll(shoppingCartService.getProductsInShoppingCart());
        }
        shoppingCartService.removeAllProductsFromShoppingCart();
        return order;
    }

    public List<Product> getOrder() {
        return order;
    }
    public void toPay() {
        System.out.println("Now you can pay!");
    }
}
