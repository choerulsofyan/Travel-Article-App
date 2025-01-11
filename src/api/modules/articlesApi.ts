import api from "@/api";
import { ArticleResponse, ArticlesResponse, CreateArticlePayload, CreateOrUpdateArticleResponse, UpdateArticlePayload } from "@/types/articles";

const articlesApi = {
    getAllArticlesWithComments: () => api.get<ArticlesResponse>(`/articles?populate=*`),
    // getArticles: (page: number = 1, pageSize: number = 10) => api.get<ArticlesResponse>(`/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}`),
    getArticles: (page: number = 1, pageSize: number = 10) =>
        api.get<ArticlesResponse>(
            `/articles?populate[user]=*&populate[category]=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[comments][populate][user]=*`,
        ),
    createArticle: (payload: CreateArticlePayload) => api.post<CreateOrUpdateArticleResponse>("/articles", payload),
    getArticle: (documentId: string) => api.get<ArticleResponse>(`/articles/${documentId}?populate=*`),
    updateArticle: (documentId: string, payload: UpdateArticlePayload) => api.put<CreateOrUpdateArticleResponse>(`/articles/${documentId}`, payload),
    deleteArticle: (documentId: string) => api.delete(`/articles/${documentId}`),
};

export default articlesApi;
