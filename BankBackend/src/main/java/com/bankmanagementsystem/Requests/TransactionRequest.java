package com.bankmanagementsystem.Requests;


import lombok.*;

@Setter
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {

	private int account_number;


}
