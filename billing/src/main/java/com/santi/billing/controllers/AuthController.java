package com.santi.billing.controllers;

import com.santi.billing.models.TokenResponse;
import com.santi.billing.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173",
        allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
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