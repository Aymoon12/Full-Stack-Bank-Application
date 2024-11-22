package com.bankmanagementsystem.account;

import brave.Response;
import com.bankmanagementsystem.Requests.*;
import com.bankmanagementsystem.transactions.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/v1/account")
public class AccountController {

	@Autowired
	private final AccountRepository accountRepository;
	private final AccountService accountService;

	@PostMapping("/addAccount")
	public ResponseEntity<Account> addAccount(@RequestBody AccountRegistrationRequest accountRegistrationRequest){
		return ResponseEntity.ok(accountService.addAccount(accountRegistrationRequest));
	}

	@PostMapping("/deposit")
	public ResponseEntity<String> deposit(@RequestBody MoneyHandlingRequest mhr){
		return ResponseEntity.ok(accountService.deposit(mhr));
	}

	@PostMapping("/withdraw")
	public ResponseEntity<String> withdraw(@RequestBody MoneyHandlingRequest mhr){
		return ResponseEntity.ok(accountService.withdraw(mhr));
	}

	@DeleteMapping("/deleteAccount/{id}")
	public ResponseEntity<Account> delete(@PathVariable("id") int account_number){
		return ResponseEntity.ok(accountService.delete(account_number));
	}

	@PostMapping("/getTransactions")
	public ResponseEntity<List<Transaction>> getTransactions(@RequestBody TransactionRequest tr){
		return ResponseEntity.ok(accountService.getTransactions(tr));
	}

	@GetMapping("/getAccount/{id}")
	public ResponseEntity<Account> getAccountById(@PathVariable("id") int account_number){
		Account account = accountService.getAccount(account_number);
		if(account == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(account);
	}
}
