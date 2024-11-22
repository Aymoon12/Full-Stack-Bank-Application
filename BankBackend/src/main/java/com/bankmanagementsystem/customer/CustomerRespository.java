package com.bankmanagementsystem.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRespository extends JpaRepository<Customer, Integer> {

	@Query("SELECT c FROM Customer c WHERE c.userName=?1")
	Optional<Customer> findByUserName(String userName);

	@Query("SELECT c FROM Customer c WHERE c.email = ?1")
	Optional<Customer> findByEmail(String email);

	@Query("SELECT c FROM Customer c WHERE c.password =?1")
	Optional<Customer> findByPassword(String password);

	@Query("SELECT c FROM Customer c WHERE c.customer_id=?1")
	Optional<Customer> findByCustomerId(int customer_id);
}
