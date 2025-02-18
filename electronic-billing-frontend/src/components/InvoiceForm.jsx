import React, { useState } from 'react';
import { invoiceService } from '../services/invoiceService';

export const InvoiceForm = () => {
    const [error, setError] = useState(null);
    const [invoice, setInvoice] = useState({
        document: '01',
        numbering_range_id: 4,
        reference_code: '',
        observation: '',
        payment_form: {
            code: '1',
            name: 'Pago de contado'
        },
        customer: {
            identification: '',
            names: '',
            identification_document_id: 3,
            legal_organization_id: 2,
            tribute_id: 21,
            municipality_id: 980,
            address: '',
            email: '',
            phone: ''
        },
        items: [{
            code_reference: '',
            name: '',
            quantity: 1,
            discount_rate: 0,
            price: 0,
            tax_rate: '19.00',
            unit_measure_id: 70,
            standard_code_id: 1,
            is_excluded: 0,
            tribute_id: 1,
            withholding_taxes: []
        }]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            console.log('Submitting invoice:', JSON.stringify(invoice, null, 2));
            const response = await invoiceService.createAndValidateInvoice(invoice);
            console.log('Invoice response:', response);
        } catch (error) {
            console.error('Full error object:', error);
            console.error('Error response data:', error.response?.data);
            if (error.response?.data?.data?.errors) {
                setError(Object.entries(error.response.data.data.errors)
                    .map(([key, messages]) => `${key}: ${messages.join(', ')}`)
                    .join('\n'));
            } else {
                setError(error.message || 'An error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="invoice-form">
            <h2>Create Invoice</h2>
            
            {error && (
                <div style={{ color: 'red', whiteSpace: 'pre-line', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <div>
                <input
                    type="text"
                    placeholder="Reference Code"
                    value={invoice.reference_code}
                    onChange={(e) => setInvoice(prev => ({
                        ...prev,
                        reference_code: e.target.value
                    }))}
                />
            </div>

            <div>
                <h3>Customer Information</h3>
                <input
                    type="text"
                    placeholder="Identification"
                    value={invoice.customer.identification}
                    onChange={(e) => setInvoice(prev => ({
                        ...prev,
                        customer: {
                            ...prev.customer,
                            identification: e.target.value
                        }
                    }))}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={invoice.customer.names}
                    onChange={(e) => setInvoice(prev => ({
                        ...prev,
                        customer: {
                            ...prev.customer,
                            names: e.target.value
                        }
                    }))}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={invoice.customer.email}
                    onChange={(e) => setInvoice(prev => ({
                        ...prev,
                        customer: {
                            ...prev.customer,
                            email: e.target.value
                        }
                    }))}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={invoice.customer.address}
                    onChange={(e) => setInvoice(prev => ({
                        ...prev,
                        customer: {
                            ...prev.customer,
                            address: e.target.value
                        }
                    }))}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={invoice.customer.phone}
                    onChange={(e) => setInvoice(prev => ({
                        ...prev,
                        customer: {
                            ...prev.customer,
                            phone: e.target.value
                        }
                    }))}
                />
            </div>

            <div>
                <h3>Items</h3>
                {invoice.items.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Code Reference"
                            value={item.code_reference}
                            onChange={(e) => {
                                const newItems = [...invoice.items];
                                newItems[index] = {
                                    ...newItems[index],
                                    code_reference: e.target.value
                                };
                                setInvoice(prev => ({
                                    ...prev,
                                    items: newItems
                                }));
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={(e) => {
                                const newItems = [...invoice.items];
                                newItems[index] = {
                                    ...newItems[index],
                                    name: e.target.value
                                };
                                setInvoice(prev => ({
                                    ...prev,
                                    items: newItems
                                }));
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => {
                                const newItems = [...invoice.items];
                                newItems[index] = {
                                    ...newItems[index],
                                    quantity: parseInt(e.target.value) || 0
                                };
                                setInvoice(prev => ({
                                    ...prev,
                                    items: newItems
                                }));
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => {
                                const newItems = [...invoice.items];
                                newItems[index] = {
                                    ...newItems[index],
                                    price: parseFloat(e.target.value) || 0
                                };
                                setInvoice(prev => ({
                                    ...prev,
                                    items: newItems
                                }));
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Discount Rate"
                            value={item.discount_rate}
                            onChange={(e) => {
                                const newItems = [...invoice.items];
                                newItems[index] = {
                                    ...newItems[index],
                                    discount_rate: parseFloat(e.target.value) || 0
                                };
                                setInvoice(prev => ({
                                    ...prev,
                                    items: newItems
                                }));
                            }}
                        />
                    </div>
                ))}
            </div>

            <button type="submit">Create Invoice</button>
        </form>
    );
};