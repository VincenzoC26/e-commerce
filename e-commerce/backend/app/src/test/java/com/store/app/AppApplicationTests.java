package com.store.app;

import com.store.app.model.Customer;
import com.store.app.repository.CustomerRepository;
import com.store.app.service.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AppApplicationTests {
	@Autowired
	private CustomerService customerService;
	@Autowired
	private CustomerRepository customerRepository;

	@BeforeEach
	void preTest() {
		Customer customer = new Customer(
				1L,
				"Nome",
				"Cognome",
				"emailtest@gmail.com",
				22,
				LocalDate.of(2000,8,26),
				"password");

		customerRepository.save(customer);
	}

	@Test
	void testGetCustomer() {
		Customer customer = customerService
				.getCustomer("emailtest@gmail.com", "password");

		assertNotNull(customer);
		assertEquals("emailtest@gmail.com", customer.getEmail());
		assertEquals("password", customer.getPassword());
	}

	@Test
	void testAddNewCustomer() {
		Customer customer = new Customer(
				2L,
				"Nome2",
				"Cognome2",
				"emailtest2@gmail.com",
				22,
				LocalDate.of(2000,8,26),
				"password");

		customerService.addNewCustomer(customer);

		Customer customer1 = customerService.getCustomer("emailtest2@gmail.com", "password");
		assertNotNull(customer1);
		assertEquals(customer, customer1);
	}

	@Test
	void testDeleteCustomer() {
		customerService.deleteCustomerByEmail("emailtest@gmail.com");
		Optional<Customer> customerByEmail = customerRepository.findCustomerByEmail("emailtest@gmail.com");
		assertFalse(customerByEmail.isPresent());
	}
}
