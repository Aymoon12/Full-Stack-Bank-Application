package com.bankmanagementsystem.transactions;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name="transactions")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
@Builder
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="transaction_id")
	private int transaction_id;

	@Column(name="account_number")
	private int account_number;

	@Column(name="amount")
	private double amount;

	@CreationTimestamp
	@Column(name="transaction_date")
	@JsonFormat(pattern = "MM-dd-yyyy")
	private LocalDateTime transaction_date;

	@Column(name="destination_account")
	private int destination_account;

	@CreationTimestamp
	private LocalDateTime created_at;



}
