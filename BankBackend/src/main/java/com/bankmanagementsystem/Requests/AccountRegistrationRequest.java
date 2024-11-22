package com.bankmanagementsystem.Requests;


import lombok.*;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountRegistrationRequest {

	private String type;
	private int customer_id;
	private int balance;
	private String account_name;

}
