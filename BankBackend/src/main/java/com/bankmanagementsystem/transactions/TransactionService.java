package com.bankmanagementsystem.transactions;


import com.bankmanagementsystem.Requests.TransferRequest;
import com.bankmanagementsystem.account.Account;
import com.bankmanagementsystem.account.AccountRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

	@Autowired
	private final AccountRepository accountRepository;

	@Autowired
	private final TransactionRepository transactionRepository;


	@Transactional
	public String transfer(TransferRequest tr) {

		int amount = tr.getAmount();
		int destination = tr.getDestinationAccountNumber();
		int source = tr.getSourceAccountNumber();

		// Logging the transfer request
		System.out.println("Transfer request from " + source + " to " + destination + " of amount " + amount);


		Account sourceAccount = accountRepository.findByAccountNumber(source).orElse(null);
		if(sourceAccount == null){
			throw new IllegalStateException("Source account not found");
		}
		Account destinationAccount = accountRepository.findByAccountNumber(destination).orElse(null);
		if(destinationAccount == null){
			throw new IllegalStateException("Destination account not found");
		}
		if(sourceAccount.getBalance() < amount){
			return "IB"; //insufficentBalance
		}
		sourceAccount.setBalance(sourceAccount.getBalance() - amount);
		accountRepository.save(sourceAccount);
		destinationAccount.setBalance(destinationAccount.getBalance() + amount);
		accountRepository.save(destinationAccount);

		Transaction transaction = new Transaction();
		transaction.setAccount_number(source);
		transaction.setDestination_account(destination);
		transaction.setAmount(amount);
		// Logging before saving transaction
		System.out.println("Saving transaction from " + source + " to " + destination + " of amount " + amount);

		transactionRepository.save(transaction);



		return "Successfully transferred";

	}

	public List<Transaction> getFive() {
		List<Transaction> list = transactionRepository.findTop5ByOrderByTransactionDateDesc().orElse(null);

		if(list == null){
			throw new IllegalStateException("No transactions found");
		}
		return list;

	}

	public Transaction getRecentDeposit() {
		return transactionRepository.findTop1ByOrderByTransactionDateDesc().orElse(null);
	}
}
