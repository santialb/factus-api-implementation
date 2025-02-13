package com.santi.billing.controllers;

import com.santi.billing.models.TokenResponse;
import com.santi.billing.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/token")
    public ResponseEntity<TokenResponse> getToken() {
        TokenResponse token = authenticationService.authenticate();
        return ResponseEntity.ok(token);
    }
}