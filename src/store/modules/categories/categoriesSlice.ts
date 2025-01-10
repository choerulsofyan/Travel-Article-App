// src/store/modules/categories/categoriesSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesApi from "@/api/modules/categoriesApi";
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "@/types/categories";

interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    page: number;
    pageSize: number;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
    hasMore: true,
    page: 1,
    pageSize: 10,
};

export const fetchAllCategories = createAsyncThunk<
    Category[], // Return type (array of all categories)
    void, // No arguments needed
    { rejectValue: string }
>("categories/fetchAllCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await categoriesApi.getAllCategories(); // Assuming this fetches all
        return response.data.data;
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data.message || "Failed to fetch categories");
    }
});

export const fetchCategories = createAsyncThunk<
    { categories: Category[]; page: number; pageSize: number },
    { page: number; pageSize: number },
    { rejectValue: string }
>("categories/fetchCategories", async ({ page, pageSize }, { rejectWithValue }) => {
    try {
        const response = await categoriesApi.getCategories(page, pageSize);
        return { categories: response.data.data, page, pageSize };
    } catch (err: any) {
        if (!err.response) {
            throw err;
        }
        return rejectWithValue(err.response.data.message || "Failed to fetch categories");
    }
});

export const fetchCategoryById = createAsyncThunk<Category, string, { rejectValue: string }>(
    "categories/fetchCategoryById",
    async (documentId, { rejectWithValue }) => {
        try {
            const response = await categoriesApi.getCategoryById(documentId);
            return response.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to fetch category");
        }
    },
);

export const createCategory = createAsyncThunk<Category, CreateCategoryPayload, { rejectValue: string }>(
    "categories/createCategory",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await categoriesApi.createCategory(payload);
            return response.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to create category");
        }
    },
);

export const updateCategory = createAsyncThunk<Category, { documentId: string; payload: UpdateCategoryPayload }, { rejectValue: string }>(
    "categories/updateCategory",
    async ({ documentId, payload }, { rejectWithValue }) => {
        try {
            const response = await categoriesApi.updateCategory(documentId, payload);
            return response.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to update category");
        }
    },
);

export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
    "categories/deleteCategory",
    async (documentId, { rejectWithValue }) => {
        try {
            await categoriesApi.deleteCategory(documentId); // Assuming it returns no content
            return documentId; // Return documentId for removing from state
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to delete category");
        }
    },
);

// --- Slice ---
const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        resetCategories: (state) => {
            state.categories = [];
            state.page = 1;
            state.pageSize = 10;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = [...state.categories, ...action.payload.categories];
                state.hasMore = action.payload.categories.length === state.pageSize;
                state.page = action.payload.page + 1;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch categories";
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex((category) => category.documentId === action.payload.documentId);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter((category) => category.documentId !== action.payload);
            })
            // Add cases for fetchCategoryById if needed
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                // Update state with the fetched category, if necessary
                const index = state.categories.findIndex((category) => category.documentId === action.payload.documentId);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                } else {
                    state.categories.push(action.payload);
                }
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                // Replace the existing categories with all fetched categories
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.error = action.payload || "Failed to fetch all categories";
            });
    },
});

export const { resetCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
