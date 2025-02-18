package com.santi.billing.models.dto;

import lombok.Data;

@Data
public class Customer {
    private String identification;
    private String dv;
    private String company;
    private String tradeName;
    private String names;
    private String address;
    private String email;
    private String phone;
    private Integer legalOrganizationId;
    private Integer tributeId;
    private Integer identificationDocumentId;
    private Integer municipalityId;
}

