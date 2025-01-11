import { Category } from "./categories";
import { User } from "./auth";
import { Comment } from "./comments";

interface Timestamped {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Article extends Timestamped {
    id: number;
    documentId: string;
    title: string;
    description: string;
    cover_image_url: string | null;
    locale: string | null;
    category: Category | null;
    comments: Comment[];
    localizations: any[];
    user: User;
}

export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface ArticlesResponse {
    data: Article[];
    meta: {
        pagination: PaginationMeta;
    };
}

export interface ArticleResponse {
    data: Article;
    meta: Record<string, any>;
}

export interface CreateArticlePayload {
    data: {
        title: string;
        description: string;
        cover_image_url: string | null;
        category: number;
    };
}

export interface UpdateArticlePayload {
    data: {
        title: string;
        description: string;
        cover_image_url: string | null;
        category: number;
    };
}

export interface UpdateArticleErrorResponse {
    data: null;
    error: {
        status: number;
        name: string;
        message: string;
        details: Record<string, any>;
    };
}

export interface CreateOrUpdateArticleResponse {
    data: Article;
    meta: Record<string, any>;
}
