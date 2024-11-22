package com.bankmanagementsystem.transactions;

import com.bankmanagementsystem.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

	@Query("SELECT t FROM Transaction t ORDER BY t.transaction_date DESC LIMIT 5")
	Optional<List<Transaction>> findTop5ByOrderByTransactionDateDesc();

	@Query("SELECT t FROM Transaction t ORDER BY t.transaction_date DESC LIMIT 1")
	Optional<Transaction> findTop1ByOrderByTransactionDateDesc();
}
