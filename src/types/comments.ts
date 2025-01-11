import { Article } from "./articles";

export interface Comment {
    id: number;
    documentId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    article?: Article | null;
}

export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface CommentsResponse {
    data: Comment[];
    meta: {
        pagination: PaginationMeta;
    };
}

export interface CommentResponse {
    data: Comment;
    meta: Record<string, any>;
}

export interface CreateCommentPayload {
    data: {
        content: string;
        article: number;
    };
}

export interface UpdateCommentPayload {
    data: {
        content: string;
    };
}
