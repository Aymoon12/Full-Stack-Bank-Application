package com.bankmanagementsystem.customer;

import com.bankmanagementsystem.account.Account;
import com.bankmanagementsystem.account.AccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

	@Autowired
	private final CustomerRespository customerRespository;
	@Autowired
	private final PasswordEncoder passwordEncoder;
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	public CustomerService(CustomerRespository customerRespository, PasswordEncoder passwordEncoder) {
		this.customerRespository = customerRespository;
		this.passwordEncoder = passwordEncoder;
	}

	public void saveCustomer(Customer customer) {
		Optional<Customer> cusUser = customerRespository.findByUserName(customer.getUsername());
		Optional<Customer> cusEmail = customerRespository.findByEmail(customer.getEmail());
		if(cusUser.isPresent()){
			throw new IllegalStateException("Username is already used!");
		}
		else if(cusEmail.isPresent()){
			throw new IllegalStateException("Email is already used!");
		}
		customerRespository.save(customer);
	}

	public List<Customer> getAllCustomers() {
		return customerRespository.findAll();
	}

	public Customer login(String userName, String password) {
		if(userName == null || userName.isEmpty() || password == null || password.isEmpty()){
			throw new IllegalStateException("Username and password are required!");
		}
		Customer cusUser = customerRespository.findByUserName(userName).orElse(null);
		if(cusUser == null){
			return null;
		}
		if (!cusUser.getPassword().equals(password)) {
			return null;
		}
		return cusUser;
	}

	@Transactional
	public void updatePassword(String userName, String newPassword) {
		if(userName == null || userName.isEmpty() || newPassword == null || newPassword.isEmpty()){
			throw new IllegalStateException("Username and password are required!");
		}
		Customer c = customerRespository.findByUserName(userName).orElse(null);
		if(c == null){
			throw new IllegalStateException("Username not found!");
		}
		c.setPassword(passwordEncoder.encode(newPassword));
	}


	public Customer findCustomer(String username){
		Customer c =  customerRespository.findByUserName(username).orElse(null);
		if(c == null){
			throw new IllegalStateException("Username not found!");
		}
		return c;
	}

	public String d(){
		return "Response from other side";
	}


	public List<Account> getAccounts(int customerId) {
		Customer cus = customerRespository.findByCustomerId(customerId).orElse(null);
		if(cus == null){
			throw new IllegalStateException("Customer not found!");
		}
		return cus.getAccounts();
	}
}
