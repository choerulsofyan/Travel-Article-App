import api from "@/api";
import { CategoriesResponse, CategoryResponse, CreateCategoryPayload, UpdateCategoryPayload } from "@/types/categories";

const categoriesApi = {
    getAllCategories: () => api.get<CategoriesResponse>(`/categories`),
    getCategories: (page: number = 1, pageSize: number = 10) =>
        api.get<CategoriesResponse>(`/categories?pagination[page]=${page}&pagination[pageSize]=${pageSize}`),
    getCategoryById: (documentId: string) => api.get<CategoryResponse>(`/categories/${documentId}`),
    createCategory: (payload: CreateCategoryPayload) => api.post<CategoryResponse>("/categories", payload),
    updateCategory: (documentId: string, payload: UpdateCategoryPayload) => api.put<CategoryResponse>(`/categories/${documentId}`, payload),
    deleteCategory: (documentId: string) => api.delete(`/categories/${documentId}`),
};

export default categoriesApi;
