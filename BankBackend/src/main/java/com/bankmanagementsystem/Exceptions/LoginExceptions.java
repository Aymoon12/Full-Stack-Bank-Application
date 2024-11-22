package com.bankmanagementsystem.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class LoginExceptions {

	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<String> handleIllegalStateException(IllegalStateException e) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	}
}
