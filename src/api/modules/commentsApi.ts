// src/api/modules/commentsApi.ts
import api from "../index";
import { CommentsResponse, CommentResponse, CreateCommentPayload, UpdateCommentPayload } from "../../types/comments";

const commentsApi = {
    getAllComments: () => api.get<CommentsResponse>("/comments"),
    getCommentById: (documentId: string) => api.get<CommentResponse>(`/comments/${documentId}`),
    createComment: (payload: CreateCommentPayload) => api.post<CommentResponse>("/comments", payload),
    updateComment: (documentId: string, payload: UpdateCommentPayload) => api.put<CommentResponse>(`/comments/${documentId}`, payload),
    deleteComment: (documentId: string) => api.delete(`/comments/${documentId}`),
};

export default commentsApi;
