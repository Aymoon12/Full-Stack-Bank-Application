package com.bankmanagementsystem.Authentication.auth;

import com.bankmanagementsystem.Authentication.config.JwtService;
import com.bankmanagementsystem.Requests.LoginRequest;
import com.bankmanagementsystem.Requests.RegisterRequest;
import com.bankmanagementsystem.customer.Customer;
import com.bankmanagementsystem.customer.CustomerRespository;
import com.bankmanagementsystem.customer.CustomerService;
import com.bankmanagementsystem.customer.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {


	private final CustomerRespository repository;
	private final PasswordEncoder passwordEncoder;
	private final CustomerService customerService;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private final CustomerRespository customerRespository;

	public AuthenticationResponse register(RegisterRequest request){
		Customer cus = new Customer();
				cus.setName(request.getName());
				cus.setEmail(request.getEmail());
				cus.setPhone_number(request.getPhone_number());
				cus.setAddress(request.getAddress());
				cus.setDob(request.getDob());
				cus.setUserName(request.getUsername());
				cus.setPassword(passwordEncoder.encode(request.getPassword()));
				cus.setRole(Role.USER);


		customerRespository.save(cus);
		var jwtToken = jwtService.generateToken(cus);

		return new AuthenticationResponse(jwtToken);
	}

	public AuthenticationResponse authenticate(LoginRequest loginRequest) {

		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getUsername(),
						loginRequest.getPassword()
				)
		);

		var user = repository.findByUserName(loginRequest.getUsername())
				.orElseThrow(() -> new UsernameNotFoundException("Username not found!"));
		var jwtToken = jwtService.generateToken(user);
		return new AuthenticationResponse(jwtToken);

	}
}
