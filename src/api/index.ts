import axios from "axios";
import config from "@/config";

const api = axios.create({
    baseURL: config.apiBaseUrl,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor - Handle unauthorized errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Redirect to login or handle unauthorized access
        }
        return Promise.reject(error);
    },
);

export default api;
