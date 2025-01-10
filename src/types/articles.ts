// src/types/article.ts

// Common interface for objects with timestamps
interface Timestamped {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// User Type
export interface User extends Timestamped {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    locale: string | null;
}

// Comment Type
export interface Comment extends Timestamped {
    id: number;
    documentId: string;
    content: string;
    locale: string | null;
}

// Category Type
export interface Category {
    id: number;
    name: string;
    // Add other fields if your category has more data
}

// Article Type
export interface Article extends Timestamped {
    id: number;
    documentId: string;
    title: string;
    description: string;
    cover_image_url: string;
    locale: string | null;
    user: User;
    category: Category | null;
    comments: Comment[];
    localizations: any[]; // Define this more specifically if you have localization data
}

// Pagination Meta Data
export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

// API Response for fetching multiple articles
export interface ArticlesResponse {
    data: Article[];
    meta: {
        pagination: PaginationMeta;
    };
}

// API Response for fetching a single article
export interface ArticleResponse {
    data: Article;
    meta: Record<string, any>; // You can define a more specific type if needed for single article meta
}

// Create Article Payload
export interface CreateArticlePayload {
    title: string;
    description: string;
    cover_image_url: string;
    category: number; // Assuming category is referenced by ID
}

// Update Article Payload
export interface UpdateArticlePayload {
    title?: string;
    description?: string;
    cover_image_url?: string;
    category?: number; // Assuming category is referenced by ID
}

// Update Article Error Response (if not allowed)
export interface UpdateArticleErrorResponse {
    data: null;
    error: {
        status: number;
        name: string;
        message: string;
        details: Record<string, any>; // You can be more specific if needed
    };
}

// API Response for creating/updating an article
export interface CreateOrUpdateArticleResponse {
    data: Article;
    meta: Record<string, any>; // Define this more specifically if you have the structure of meta
}
