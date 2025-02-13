import axios from 'axios';
import { authService } from '../services/authService';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = authService.getStoredToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;