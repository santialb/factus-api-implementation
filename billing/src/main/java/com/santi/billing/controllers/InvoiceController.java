package com.santi.billing.controllers;

import com.santi.billing.models.dto.InvoiceRequest;
import com.santi.billing.services.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173",
        allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping("/validate")
    public ResponseEntity<?> createAndValidateInvoice(@RequestBody InvoiceRequest request) {
        return invoiceService.createAndValidateInvoice(request);
    }
}
