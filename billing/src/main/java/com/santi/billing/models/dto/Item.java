package com.santi.billing.models.dto;

import lombok.Data;

import java.util.List;

@Data
public class Item {
    private String codeReference;
    private String name;
    private Integer quantity;
    private Float discountRate;
    private Float price;
    private String taxRate;
    private Integer unitMeasureId;
    private Integer standardCodeId;
    private Integer isExcluded;
    private Integer tributeId;
    private List<WithholdingTax> withholdingTaxes;
}
