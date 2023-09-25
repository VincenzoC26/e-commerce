package com.store.app.repository;

import com.store.app.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("SELECT customer FROM Customer customer WHERE customer.email = ?1")
    Optional<Customer> findCustomerByEmail(String email);


}
