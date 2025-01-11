// src/api/index.ts
import axios from "axios";
import config from "../config";
import { store } from "../store/store";
import { logout } from "@/store/modules/auth/authSlice";
import { setGlobalError } from "@/store/modules/errors/errorSlice";

const api = axios.create({
    baseURL: config.apiBaseUrl,
});

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

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
        }

        // Dispatch a global error with more detail
        const defaultMessage = "An unexpected error occurred";
        const errorDetails = {
            status: error.response ? error.response.status : null,
            message: error.response ? error.response.data.error?.message || error.response.data.message || defaultMessage : defaultMessage,
        };

        store.dispatch(setGlobalError(`${errorDetails.message} (Status Code: ${errorDetails.status})`));

        return Promise.reject(error);
    },
);

export default api;
