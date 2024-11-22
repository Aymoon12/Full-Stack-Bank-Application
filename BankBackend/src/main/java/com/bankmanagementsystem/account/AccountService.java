package com.bankmanagementsystem.account;


import com.bankmanagementsystem.Requests.*;
import com.bankmanagementsystem.customer.CustomerRespository;
import com.bankmanagementsystem.customer.CustomerService;
import com.bankmanagementsystem.transactions.Transaction;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AccountService {

	@Autowired
	private CustomerService customerService;
	@Autowired
	private AccountRepository accountRepository;

	Random rand  = new Random();
	@Autowired
	private CustomerRespository customerRespository;


	public Account addAccount(AccountRegistrationRequest account1) {
		Account account = new Account();


		if(account1.getType() == null || account1.getType().isEmpty()){
			System.out.println(account1.getType());
			account.setAccount_type(Account.AccountType.CHECKING);
		}
		else
			account.setAccount_type(account1.getType().equalsIgnoreCase("checking")
				? Account.AccountType.CHECKING : Account.AccountType.SAVINGS);

		account.setAccount_number(rand.nextInt(100000)+1000000);
		account.setBalance(account1.getBalance());

		account.setCustomer_id(account1.getCustomer_id());
		account.setAccount_name(account1.getAccount_name());
		accountRepository.save(account);

		return account;
	}



	@Transactional
	public String deposit(MoneyHandlingRequest mhr) {

		int amount = mhr.getAmount();
		int accountNumber = mhr.getAccount_number();

		Account account = accountRepository.findByAccountNumber(accountNumber).orElse(null);
		if(account == null){
			throw new IllegalStateException("Account not found");
		}
		account.setBalance(account.getBalance() + amount);
		accountRepository.save(account);
		return "Successfully deposited";

	}

	@Transactional
	public String withdraw(MoneyHandlingRequest mhr) {

		int amount = mhr.getAmount();
		int accountNumber = mhr.getAccount_number();

		Account account = accountRepository.findByAccountNumber(accountNumber).orElse(null);
		if(account == null){
			throw new IllegalStateException("Account not found");
		}
		if(account.getBalance() < amount){
			throw new IllegalStateException("Insufficient balance");
		}
		account.setBalance(account.getBalance() - amount);
		accountRepository.save(account);
		return "Successful Withdraw";

	}


	@Transactional
	public Account delete(int account_number) {

		Account account = accountRepository.findByAccountNumber(account_number).orElse(null);

		if(account == null){
			throw new IllegalStateException("Account not found");

		}
		accountRepository.delete(account);
		return account;
	}


	public List<Transaction> getTransactions(TransactionRequest tr) {
		Account account = accountRepository.findByAccountNumber(tr.getAccount_number()).orElse(null);
		if(account == null){
			throw new IllegalStateException("Account not found");
		}
		return account.getTransactions();
	}

	public Account getAccount(int account_number) {
		return accountRepository.findByAccountNumber(account_number).orElse(null);
	}
}
