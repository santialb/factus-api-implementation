package com.santi.billing.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class InvoiceRequest {
    private String document;
    private Integer numberingRangeId;
    private String referenceCode;
    private String observation;
    private PaymentForm paymentForm;
    private Customer customer;
    private List<Item> items;
}
