import axios from 'axios';
import { authService } from '../services/authService';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.url, config.data);
        
        const token = authService.getStoredToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response received:', response);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response || error);
        return Promise.reject(error);
    }
);

export default axiosInstance;