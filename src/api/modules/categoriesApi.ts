// src/api/modules/categoriesApi.ts
import api from "@/api";
import { CategoriesResponse, CategoryResponse, CreateCategoryPayload, UpdateCategoryPayload } from "@/types/categories";

const categoriesApi = {
    getAllCategories: () => api.get<CategoriesResponse>("/categories"),
    getCategoryById: (documentId: string) => api.get<CategoryResponse>(`/categories/${documentId}`),
    createCategory: (payload: CreateCategoryPayload) => api.post<CategoryResponse>("/categories", payload),
    updateCategory: (documentId: string, payload: UpdateCategoryPayload) => api.put<CategoryResponse>(`/categories/${documentId}`, payload),
    deleteCategory: (documentId: string) => api.delete(`/categories/${documentId}`),
};

export default categoriesApi;
