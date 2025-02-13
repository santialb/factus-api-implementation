package com.santi.billing.configurations;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "oauth2")
@Getter
@Setter
public class OAuth2Properties {
    private String tokenUrl;
    private String clientId;
    private String clientSecret;
    private String username;
    private String password;
}
