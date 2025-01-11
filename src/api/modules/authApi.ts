import api from "@/api";
import { LoginCredentials, RegisterCredentials, AuthSuccessResponse } from "@/types/auth";

const authApi = {
    login: (credentials: LoginCredentials) => api.post<AuthSuccessResponse>("/auth/local", credentials),
    register: (credentials: RegisterCredentials) => api.post<AuthSuccessResponse>("/auth/local/register", credentials),
};

export default authApi;
