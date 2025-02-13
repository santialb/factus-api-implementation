package com.santi.billing.models;

import lombok.Data;

@Data
public class TokenResponse {
    private String token_type;
    private Integer expires_in;
    private String access_token;
    private String refresh_token;
}
