package com.store.app.controller;

import com.store.app.model.Product;
import com.store.app.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/order")
@AllArgsConstructor
public class OrderController {

    @Autowired
    private final OrderService orderService;

    @PostMapping("/add")
    public List<Product> createOrder() {
        return orderService.createOrder();
    }

    @GetMapping("/get")
    public List<Product> getOrder() {
        return orderService.getOrder();
    }

    @GetMapping("/get/toPay")
    public void toPay() {
        orderService.toPay();
    }
}
