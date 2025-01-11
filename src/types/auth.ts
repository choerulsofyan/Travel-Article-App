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

export interface LoginCredentials {
    identifier: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    username: string;
    password: string;
}

export interface AuthSuccessResponse {
    jwt: string;
    user: User;
}

export interface AuthErrorResponse {
    data: null;
    error: {
        status: number;
        name: string;
        message: string;
        details: Record<string, any>;
    };
}
