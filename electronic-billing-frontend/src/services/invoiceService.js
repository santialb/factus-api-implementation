import axiosInstance from '../utils/axiosConfig';

const API_URL = 'http://localhost:8080/api/invoices';

export const invoiceService = {
    async createAndValidateInvoice(invoiceData) {
        try {
            const response = await axiosInstance.post(`${API_URL}/validate`, invoiceData);
            return response.data;
        } catch (error) {
            console.error('Error in invoice service:', error);
            throw error.response?.data || error.message;
        }
    }
};