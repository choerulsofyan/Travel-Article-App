// src/store/modules/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/rootReducer"; // Import RootState if you need to access other slices
import authApi from "@/api/modules/authApi";
import { LoginCredentials, RegisterCredentials, AuthSuccessResponse, User } from "@/types/auth";

// Define the initial state for the auth slice
interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    user: User | null;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    token: null,
    error: null,
};

// Async Thunks for API Calls
// --- LOGIN ---
export const login = createAsyncThunk<
    AuthSuccessResponse, // Return type of the payload creator (success)
    LoginCredentials, // First argument to the payload creator (credentials)
    { rejectValue: string; state: RootState } // Types for `rejectWithValue` and `getState`
>("auth/login", async (credentials, { rejectWithValue, getState }) => {
    try {
        // Access current state if needed:
        // const currentToken = getState().auth.token;

        const response = await authApi.login(credentials);
        return response.data; // The fulfilled action will have the payload: { jwt: ..., user: ... }
    } catch (err: any) {
        if (!err.response) {
            throw err; // Re-throw if it's not an API error (e.g., network issue)
        }
        // Extract the error message from the API response and return it using rejectWithValue
        return rejectWithValue(err.response.data.error.message);
    }
});

// --- REGISTER ---
export const register = createAsyncThunk<AuthSuccessResponse, RegisterCredentials, { rejectValue: string }>(
    "auth/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authApi.register(credentials);
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.error.message);
        }
    },
);

// Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token"); // Or remove the token from wherever you store it
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        loadUserFromLocalStorage: (state) => {
            const userString = localStorage.getItem("user");
            if (userString) {
                const user = JSON.parse(userString);
                state.isAuthenticated = true;
                state.user = user;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // --- LOGIN ---
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.jwt;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.jwt); // Consider security implications
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload || "Login failed"; // Use the rejected value (error message) or a default message
            })
            // --- REGISTER ---
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.jwt;
                state.user = action.payload.user;
                localStorage.setItem("token", action.payload.jwt);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload || "Registration failed";
            });
    },
});

// Export actions and reducer
export const { logout, setUser, clearError, loadUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
