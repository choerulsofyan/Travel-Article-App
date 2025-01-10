import api from "@/api";
import {
    Article,
    ArticleResponse,
    ArticlesResponse,
    CreateArticlePayload,
    CreateOrUpdateArticleResponse,
    UpdateArticlePayload,
} from "@/types/articles";

const articlesApi = {
    getArticles: (page: number = 1, pageSize: number = 10) =>
        api.get<ArticlesResponse>(`/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}`),
    createArticle: (payload: CreateArticlePayload) => api.post<CreateOrUpdateArticleResponse>("/articles", payload),
    getArticle: (documentId: string) => api.get<ArticleResponse>(`/articles/${documentId}`),
    updateArticle: (documentId: string, payload: UpdateArticlePayload) => api.put<CreateOrUpdateArticleResponse>(`/articles/${documentId}`, payload),
    deleteArticle: (documentId: string) => api.delete(`/articles/${documentId}`),
};

export default articlesApi;
