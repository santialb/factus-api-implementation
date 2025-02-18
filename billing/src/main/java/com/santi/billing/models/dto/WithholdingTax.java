package com.santi.billing.models.dto;

import lombok.Data;

@Data
public class WithholdingTax {
    private String code;
    private Float withholdingTaxRate;
}
