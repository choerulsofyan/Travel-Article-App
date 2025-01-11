import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articlesApi from "@/api/modules/articlesApi";
import { Article, CreateArticlePayload, UpdateArticlePayload } from "@/types/articles";

interface ArticlesState {
    articles: Article[];
    loading: boolean;
    error: string | null;
    hasMore: boolean; // Add hasMore flag for infinite scrolling
    page: number; // Add page number for tracking pagination
    pageSize: number;
}

const initialState: ArticlesState = {
    articles: [],
    loading: false,
    error: null,
    hasMore: true, // Initially assume there are more articles to fetch
    page: 1,
    pageSize: 10,
};

export const fetchArticles = createAsyncThunk<
    { articles: Article[]; page: number; pageSize: number },
    { page: number; pageSize: number },
    { rejectValue: string }
>("articles/fetchArticles", async ({ page, pageSize }, { rejectWithValue }) => {
    try {
        const response = await articlesApi.getArticles(page, pageSize);
        return { articles: response.data.data, page, pageSize };
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data.message || "Failed to fetch articles");
    }
});

export const fetchAllArticlesWithComments = createAsyncThunk<
    Article[], // Return type (array of all articles)
    void, // No arguments needed
    { rejectValue: string }
>("articles/fetchAllArticlesWithComments", async (_, { rejectWithValue }) => {
    try {
        const response = await articlesApi.getAllArticlesWithComments();
        return response.data.data; // Return all articles with comments
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data.message || "Failed to fetch articles with comments");
    }
});

export const createArticle = createAsyncThunk<Article, CreateArticlePayload, { rejectValue: string }>(
    "articles/createArticle",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await articlesApi.createArticle(payload);
            return response.data.data; // Your API returns the created article
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to create article");
        }
    },
);

export const updateArticle = createAsyncThunk<
    Article, // Return type
    { documentId: string; payload: UpdateArticlePayload }, // Argument type (id and payload)
    { rejectValue: string }
>("articles/updateArticle", async ({ documentId, payload }, { rejectWithValue }) => {
    try {
        const response = await articlesApi.updateArticle(documentId, payload);
        return response.data.data; // Assuming your API returns the updated article
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data.message || "Failed to update article");
    }
});

export const fetchArticleById = createAsyncThunk<Article, string, { rejectValue: string }>(
    "articles/fetchArticleById",
    async (documentId, { rejectWithValue }) => {
        try {
            const response = await articlesApi.getArticle(documentId);
            return response.data.data; // Return the single Article object
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to fetch article");
        }
    },
);

export const deleteArticle = createAsyncThunk<
    string, // Return type (documentId of the deleted article)
    string, // Argument type (documentId)
    { rejectValue: string }
>("articles/deleteArticle", async (documentId, { rejectWithValue }) => {
    try {
        await articlesApi.deleteArticle(documentId);
        return documentId; // Return the documentId on success
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data.message || "Failed to delete article");
    }
});

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        resetArticles: (state) => {
            state.articles = [];
            state.page = 1;
            state.pageSize = 10;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = [...state.articles, ...action.payload.articles];
                state.hasMore = action.payload.articles.length === state.pageSize;
                state.page = action.payload.page + 1;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch articles";
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                // Remove the deleted article from the state
                state.articles = state.articles.filter((article) => article.documentId !== action.payload);
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                // You can update the state with the fetched article if needed
                // For example: state.currentArticle = action.payload;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                const index = state.articles.findIndex(
                    (article) => article.documentId === action.payload.documentId, // Use documentId for comparison
                );
                if (index !== -1) {
                    state.articles[index] = action.payload;
                }
            })
            .addCase(fetchAllArticlesWithComments.fulfilled, (state, action) => {
                // Assuming you want to replace all articles with the fetched ones:
                state.articles = action.payload;
                // You might also want to reset pagination related state:
                state.page = 1;
                state.hasMore = true;
            })
            .addCase(fetchAllArticlesWithComments.rejected, (state, action) => {
                state.error = action.payload || "Failed to fetch articles with comments";
            });
    },
});

export const { resetArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
