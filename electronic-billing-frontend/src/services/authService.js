import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; //backend URL

export const authService = {
    async getToken() {
        try {
            const response = await axios.post(`${API_URL}/token`);
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
            }
            return response.data;
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    },

    getStoredToken() {
        return localStorage.getItem('token');
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }
};