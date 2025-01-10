import api from "../index";
import { Article } from "../../types/articles";

const articlesApi = {
  getArticles: () => api.get("/articles"),
  createArticle: (article: Article) => api.post<Article>("/articles", article),
  getArticle: (id: number) => api.get<Article[]>(`/articles/${id}`),
  updateArticle: (article: Article) => api.put<any>(`/articles/${article.id}`, article),
  deleteArticle: (id: string) => api.delete<any>(`/articles/${id}`),
};

export default articlesApi;
