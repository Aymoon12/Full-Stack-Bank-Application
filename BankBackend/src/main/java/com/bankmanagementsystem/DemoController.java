package com.bankmanagementsystem;


import com.bankmanagementsystem.customer.Customer;
import com.bankmanagementsystem.customer.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DemoController {

	@Autowired
	private CustomerService customerService;





}
