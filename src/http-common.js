
import axios from 'axios';

const http = axios.create({
    baseURL: "https://app-finanza-4611cd32c034.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});

// Interceptor para añadir el token a cada solicitud
http.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default http;