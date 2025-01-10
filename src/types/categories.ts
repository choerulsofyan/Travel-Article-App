// src/types/categories.ts

export interface Category {
    id: number;
    documentId: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
}

export interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface CategoriesResponse {
    data: Category[];
    meta: {
        pagination: PaginationMeta;
    };
}

export interface CategoryResponse {
    data: Category;
    meta: Record<string, any>; // You can define a more specific type if needed
}

export interface CreateCategoryPayload {
    data: {
        name: string;
        description?: string | null; // Optional description
    };
}

export interface UpdateCategoryPayload {
    data: {
        name?: string;
        description?: string | null; // Optional description
    };
}
