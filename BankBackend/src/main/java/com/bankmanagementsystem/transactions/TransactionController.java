package com.bankmanagementsystem.transactions;


import com.bankmanagementsystem.Requests.TransferRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/api/v1/transaction")
public class TransactionController {

	@Autowired
	private final TransactionService transactionService;



	@PostMapping("/transfer")
	public ResponseEntity<String> transfer(@RequestBody TransferRequest tr){
		String response = transactionService.transfer(tr);
		if(response.equalsIgnoreCase("IB")){
			System.out.println("Insufficient Balance");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient Balance");
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("/getfive")
	public ResponseEntity<List<Transaction>> getFive(){

		return ResponseEntity.ok(transactionService.getFive());
	}

	@GetMapping("/getRecent")
	public ResponseEntity<Transaction> getRecentDeposit(){
		Transaction transaction = transactionService.getRecentDeposit();
		if(transaction == null){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(transaction);
	}

}
