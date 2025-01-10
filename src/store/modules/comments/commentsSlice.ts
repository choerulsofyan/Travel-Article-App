// src/store/modules/comments/commentsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsApi from "@/api/modules/commentsApi";
import { Comment, CreateCommentPayload, UpdateCommentPayload } from "@/types/comments";

interface CommentsState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    comments: [],
    loading: false,
    error: null,
};

// --- Async Thunks ---
export const fetchComments = createAsyncThunk<Comment[], void, { rejectValue: string }>("comments/fetchComments", async (_, { rejectWithValue }) => {
    try {
        const response = await commentsApi.getAllComments();
        return response.data.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data.message || "Failed to fetch comments");
    }
});

export const fetchCommentById = createAsyncThunk<Comment, string, { rejectValue: string }>(
    "comments/fetchCommentById",
    async (documentId, { rejectWithValue }) => {
        try {
            const response = await commentsApi.getCommentById(documentId);
            return response.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to fetch comment");
        }
    },
);

export const createComment = createAsyncThunk<Comment, CreateCommentPayload, { rejectValue: string }>(
    "comments/createComment",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await commentsApi.createComment(payload);
            return response.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to create comment");
        }
    },
);

export const updateComment = createAsyncThunk<Comment, { documentId: string; payload: UpdateCommentPayload }, { rejectValue: string }>(
    "comments/updateComment",
    async ({ documentId, payload }, { rejectWithValue }) => {
        try {
            const response = await commentsApi.updateComment(documentId, payload);
            return response.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to update comment");
        }
    },
);

export const deleteComment = createAsyncThunk<string, string, { rejectValue: string }>(
    "comments/deleteComment",
    async (documentId, { rejectWithValue }) => {
        try {
            await commentsApi.deleteComment(documentId);
            return documentId;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to delete comment");
        }
    },
);

// --- Slice ---
const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch comments";
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex((comment) => comment.documentId === action.payload.documentId);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter((comment) => comment.documentId !== action.payload);
            })
            // Handle fetchCommentById if you need it in the UI
            .addCase(fetchCommentById.fulfilled, (state, action) => {
                // Example: Add the fetched comment to the state (if not already present)
                const commentExists = state.comments.some((comment) => comment.documentId === action.payload.documentId);
                if (!commentExists) {
                    state.comments.push(action.payload);
                }
            });
    },
});

export default commentsSlice.reducer;
