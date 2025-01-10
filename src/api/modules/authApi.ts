import api from "@/api";
import { LoginCredentials, RegisterCredentials, AuthSuccessResponse, AuthErrorResponse } from "@/types/auth";

const authApi = {
    login: (credentials: LoginCredentials) => api.post<AuthSuccessResponse>("/auth/local", credentials), // Adjust the endpoint if needed

    register: (credentials: RegisterCredentials) => api.post<AuthSuccessResponse>("/auth/local/register", credentials), // Adjust the endpoint if needed
};

export default authApi;
