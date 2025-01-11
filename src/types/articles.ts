import { Category } from "./categories";
import { User } from "./auth";
import { Comment } from "./comments";

// Common interface for objects with timestamps
interface Timestamped {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

/* export interface User extends Timestamped {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    locale: string | null;
}

export interface Comment extends Timestamped {
    id: number;
    documentId: string;
    content: string;
    locale: string | null;
}

export interface Category {
    id: number;
    name: string;
} */

// Article Type
/* export interface Article extends Timestamped {
    id: number;
    documentId: string;
    title: string;
    description: string;
    cover_image_url: string;
    locale: string | null;
    user: User;
    category: Category | null; // category can be null based on your API response
    comments: Comment[];
    localizations: any[]; // Define this more specifically if you have localization data
} */

export interface Article extends Timestamped {
    id: number;
    documentId: string;
    title: string;
    description: string;
    cover_image_url: string; // string | null;
    locale: string | null;
    category: Category | null;
    comments: Comment[];
    localizations: any[]; // Define this more specifically if you have localization data
    user: User; // Add user field
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
    data: {
        title: string;
        description: string;
        cover_image_url: string;
        category: number; // Assuming category is referenced by ID
    };
    // title: string;
    // description: string;
    // cover_image_url: string;
    // category: number; // Assuming category is referenced by ID
}

// Update Article Payload
export interface UpdateArticlePayload {
    data: {
        title: string;
        description: string;
        cover_image_url: string;
        category: number; // Assuming category is referenced by ID
    };
    // documentId?: string;
    // title?: string;
    // description?: string;
    // cover_image_url?: string;
    // category?: number; // Assuming category is referenced by ID
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
