package com.store.app.controller;

import com.store.app.model.Customer;
import com.store.app.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/customer")
@AllArgsConstructor
@CrossOrigin(origins = "http://192.168.56.1:3000")
public class CustomerController {

    @Autowired
    private final CustomerService customerService;

    @GetMapping("/all")
    public List<Customer> getCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping("/get")
    public Customer getCustomer(@RequestParam(name = "email") String email,
                                @RequestParam(name = "password") String password) {
        return customerService.getCustomer(email,password);
    }

    @PostMapping("/add")
    public void registerNewCustomer(@RequestBody Customer customer) {
        customerService.addNewCustomer(customer);
    }

    @DeleteMapping("/delete")
    public void deleteCustomerByEmail(@RequestParam(name = "email") String email) {
        customerService.deleteCustomerByEmail(email);
    }
    @PutMapping("/changeEmail")
    public void changeEmail(@RequestParam(name = "oldEmail") String oldEmail,
                            @RequestParam(name = "newEmail") String newEmail) {
        customerService.changeEmail(oldEmail,newEmail);
    }

    @PutMapping("/changePassword")
    public void changePassword(@RequestParam(name = "email") String email,
                               @RequestParam(name = "oldPassword") String oldPassword,
                               @RequestParam(name = "newPassword") String newPassword) {
        customerService.changePassword(email,oldPassword,newPassword);
    }
}
