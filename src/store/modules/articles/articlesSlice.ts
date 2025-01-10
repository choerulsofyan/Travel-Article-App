import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articlesApi from "@/api/modules/articlesApi";
import { Article, CreateArticlePayload, UpdateArticlePayload } from "@/types/articles";

interface ArticlesState {
    articles: Article[];
    loading: boolean;
    error: string | null;
}

const initialState: ArticlesState = {
    articles: [],
    loading: false,
    error: null,
};

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
    const response = await articlesApi.getArticles();
    return response.data.data;
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

export const fetchArticleById = createAsyncThunk<
    Article, // Return type
    string, // Argument type (article ID)
    { rejectValue: string }
>("articles/fetchArticleById", async (documentId, { rejectWithValue }) => {
    try {
        const response = await articlesApi.getArticle(documentId);
        return response.data.data; // response.data.data; // Assuming your API returns the article data
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data.message || "Failed to fetch article");
    }
});

const articlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch articles";
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
            });
    },
});

export default articlesSlice.reducer;
