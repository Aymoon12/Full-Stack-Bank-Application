package com.bankmanagementsystem.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

	@Query("SELECT a FROM Account a WHERE a.account_number=?1")
	Optional<Account> findByAccountNumber(int accountNumber);



}
