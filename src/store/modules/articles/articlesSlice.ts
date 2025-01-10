import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import articlesApi from "../../../api/modules/articlesApi";
import { Article } from "../../../types/articles";

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
            });
    },
});

export default articlesSlice.reducer;
