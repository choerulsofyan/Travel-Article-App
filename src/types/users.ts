import { Article } from "./articles";
import { Comment } from "./comments";

export interface UserProfileResponse {
    id: number;
    documentId: string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    articles: Article[];
    comments: Comment[];
}
