package com.bankmanagementsystem.customer;

import com.bankmanagementsystem.Authentication.config.JwtService;
import com.bankmanagementsystem.Requests.CustId;
import com.bankmanagementsystem.Requests.LoginRequest;
import com.bankmanagementsystem.account.Account;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/bank")
public class CustomerController {

	@Autowired
	private final CustomerService customerService;
	private final CustomerRespository customerRespository;

	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	public CustomerController(CustomerService customerService, CustomerRespository customerRespository) {
		this.customerService = customerService;
		this.customerRespository = customerRespository;
	}

	@PostMapping("/add")
	public ResponseEntity<String> saveCustomer(@RequestBody Customer customer){
		customerService.saveCustomer(customer);
		return new ResponseEntity<>("Customer added successfully", HttpStatus.CREATED);
	}

	@GetMapping("/getAll")
	public ResponseEntity<List<Customer>> getAllCustomers(){
		return ResponseEntity.ok(customerService.getAllCustomers());
	}

	@PostMapping("/login")
	public ResponseEntity<Customer> loginCustomer(@RequestBody LoginRequest loginRequest) {
		return ResponseEntity.ok(customerService.login(loginRequest.getUsername(), loginRequest.getPassword()));
	}

	@GetMapping("/checkUser")
	public ResponseEntity<Customer> checkUser(@RequestParam String username) {
		return new ResponseEntity<>(customerService.findCustomer(username),HttpStatus.OK);
	}

	@PutMapping("/updatePass")
	public ResponseEntity<Boolean> updateCustomer(@RequestParam String userName ,
												  @RequestParam String newPass){
		customerService.updatePassword(userName,newPass);
		return new ResponseEntity<>(true,HttpStatus.ACCEPTED);

	}

	@GetMapping("/demo")
	public ResponseEntity<String> demo(){
		return ResponseEntity.ok(customerService.d());
	}

	@GetMapping("/all")
	public ResponseEntity<List<Customer>> getAll(){
		return ResponseEntity.ok(customerRespository.findAll());
	}

	@GetMapping("/user")
	public ResponseEntity<Customer> getUser(HttpServletRequest http){
		JwtService jwtService = new JwtService();
		String jwtToken = null;

		String authHeader = http.getHeader("Authorization");
		String username = null;

		if(authHeader != null || authHeader.startsWith("Bearer ")){
			jwtToken = authHeader.substring(7);
			username = jwtService.extractUsername(jwtToken);
			if(username != null) {
				UserDetails cus = userDetailsService.loadUserByUsername(username);
				String un = cus.getUsername();
				return ResponseEntity.ok(customerRespository.findByUserName(un).orElse(null));
			}
		}
		return null;
	}

	@GetMapping("/getAccounts")
	public ResponseEntity<List<Account>> getAccounts(@RequestBody CustId custid){
		return ResponseEntity.ok(customerService.getAccounts(custid.getCustomer_id()));
	}





}
