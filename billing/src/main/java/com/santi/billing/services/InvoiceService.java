package com.santi.billing.services;

import com.santi.billing.models.dto.InvoiceRequest;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
@Data
public class InvoiceService {
    private final RestTemplate restTemplate;
    private final String apiBaseUrl;
    private final AuthenticationService authenticationService;

    public InvoiceService(
            RestTemplate restTemplate,
            @Value("${api.base.url}") String apiBaseUrl,
            AuthenticationService authenticationService) {
        this.restTemplate = restTemplate;
        this.apiBaseUrl = apiBaseUrl;
        this.authenticationService = authenticationService;
    }

    public ResponseEntity<?> createAndValidateInvoice(InvoiceRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        String token = authenticationService.authenticate().getAccess_token();
        headers.setBearerAuth(token);

        HttpEntity<InvoiceRequest> requestEntity = new HttpEntity<>(request, headers);

        try {
            return restTemplate.exchange(
                    apiBaseUrl + "/v1/bills/validate",
                    HttpMethod.POST,
                    requestEntity,
                    Object.class
            );
        } catch (HttpClientErrorException e) {
            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(e.getResponseBodyAsString());
        }
    }
}
