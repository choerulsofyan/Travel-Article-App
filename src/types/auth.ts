// src/types/auth.ts

// User type (you might want to combine this with the one from articles.ts if they are the same)
export interface User {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

// Login Credentials
export interface LoginCredentials {
    identifier: string;
    password: string;
}

// Register Credentials
export interface RegisterCredentials {
    email: string;
    username: string;
    password: string;
}

// API Response for Successful Login/Registration
export interface AuthSuccessResponse {
    jwt: string;
    user: User;
}

// API Error Response (common structure for login and registration errors)
export interface AuthErrorResponse {
    data: null;
    error: {
        status: number;
        name: string;
        message: string;
        details: Record<string, any>; // You can be more specific if needed
    };
}
