import api from "@/api";
import { CommentsResponse, CommentResponse, CreateCommentPayload, UpdateCommentPayload } from "@/types/comments";

const commentsApi = {
    getComments: (page: number = 1, pageSize: number = 10) =>
        api.get<CommentsResponse>(`/comments?pagination[page]=${page}&pagination[pageSize]=${pageSize}`),
    getCommentById: (documentId: string) => api.get<CommentResponse>(`/comments/${documentId}`),
    createComment: (payload: CreateCommentPayload) => api.post<CommentResponse>("/comments", payload),
    updateComment: (documentId: string, payload: UpdateCommentPayload) => api.put<CommentResponse>(`/comments/${documentId}`, payload),
    deleteComment: (documentId: string) => api.delete(`/comments/${documentId}`),
};

export default commentsApi;
