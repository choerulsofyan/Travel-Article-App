import api from "@/api";
import { Article, ArticlesResponse, CreateArticlePayload, CreateOrUpdateArticleResponse, UpdateArticlePayload } from "@/types/articles";

const articlesApi = {
    getArticles: () => api.get("/articles"),
    createArticle: (payload: CreateArticlePayload) => api.post<CreateOrUpdateArticleResponse>("/articles", payload),
    getArticle: (documentId: string) => api.get<Article>(`/articles/${documentId}`),
    updateArticle: (documentId: string, payload: UpdateArticlePayload) => api.put<CreateOrUpdateArticleResponse>(`/articles/${documentId}`, payload),
    deleteArticle: (id: string) => api.delete<any>(`/articles/${id}`),
};

export default articlesApi;
