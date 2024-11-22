package com.bankmanagementsystem.Requests;

import lombok.*;

@Setter
@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MoneyHandlingRequest {

	private int amount;
	private int account_number;
}
