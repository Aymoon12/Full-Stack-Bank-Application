package com.bankmanagementsystem.Authentication.oauth2;

import com.bankmanagementsystem.Authentication.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/oath2")
@CrossOrigin
public class OAuth2LoginController {

	private final JwtService jwtTokenService;

	public OAuth2LoginController(JwtService jwtTokenService) {
		this.jwtTokenService = jwtTokenService;
	}

	@GetMapping("/loginSuccess")
	public String loginSuccess(@AuthenticationPrincipal OAuth2User oauth2User) {
		// Generate JWT token for the authenticated user
		return jwtTokenService.generateToken(oauth2User);
	}

	@GetMapping("/loginFailure")
	public String loginFailure() {
		return "Login failed!";
	}
}
