package com.santi.billing.services;

import com.santi.billing.configurations.OAuth2Properties;
import com.santi.billing.models.TokenResponse;
import lombok.Data;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
@Data
public class AuthenticationService {
    private final RestTemplate restTemplate;
    private final OAuth2Properties oAuth2Properties;

    public AuthenticationService(OAuth2Properties oAuth2Properties, RestTemplate restTemplate) {
        this.oAuth2Properties = oAuth2Properties;
        this.restTemplate = restTemplate;
    }

    public TokenResponse authenticate(){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "password");
        map.add("client_id", oAuth2Properties.getClientId());
        map.add("client_secret", oAuth2Properties.getClientSecret());
        map.add("username", oAuth2Properties.getUsername());
        map.add("password", oAuth2Properties.getPassword());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        try {
            ResponseEntity<TokenResponse> response = restTemplate.exchange(
                    oAuth2Properties.getTokenUrl(),
                    HttpMethod.POST,
                    request,
                    TokenResponse.class
            );
            return response.getBody();
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to authenticate with the API", e);
        }

    }
}
