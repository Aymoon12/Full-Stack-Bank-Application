package com.bankmanagementsystem.account;

import com.bankmanagementsystem.transactions.Transaction;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="account")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@Builder
public class Account {

	public Account(int account_number, double balance, AccountType account_type, int customer_id) {
		this.account_number = account_number;
		this.balance = balance;
		this.account_type = account_type;
		this.customer_id = customer_id;
	}

	public enum AccountType{
		CHECKING, SAVINGS;
	}

	@Id
	@Column(name="account_number")
	private int account_number;

	@Column(name="balance")
	private double balance;

	@CreationTimestamp
	@Column(name="created_at")
	private LocalDateTime created_at;


	@Enumerated(EnumType.STRING)
	AccountType account_type;

	@Column(name="customer_id")
	private int customer_id;

	private String account_name;


	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="account_number")
	private List<Transaction> transactions = new ArrayList<>();
}
