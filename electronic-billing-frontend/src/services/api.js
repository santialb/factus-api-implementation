import axios from 'axios';

const api = axios.create({
  baseURL: 'http://backend-url/api', // backend URL to do
});

export default api;