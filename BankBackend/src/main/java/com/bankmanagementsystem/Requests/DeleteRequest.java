package com.bankmanagementsystem.Requests;


import lombok.*;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeleteRequest {

	private int account_number;

}
