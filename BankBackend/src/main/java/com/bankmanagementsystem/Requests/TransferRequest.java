package com.bankmanagementsystem.Requests;


import lombok.*;

@Setter
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransferRequest {

	private int sourceAccountNumber;
	private int destinationAccountNumber;
	private int amount;
}
