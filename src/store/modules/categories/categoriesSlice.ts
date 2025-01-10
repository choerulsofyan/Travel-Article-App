// src/store/modules/categories/categoriesSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesApi from "@/api/modules/categoriesApi";
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "@/types/categories";

interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
};

// --- Async Thunks ---
export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await categoriesApi.getAllCategories();
            return response.data.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.message || "Failed to fetch categories");
        }
    },
);

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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
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
            });
    },
});

export default categoriesSlice.reducer;
