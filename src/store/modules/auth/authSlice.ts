import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/rootReducer";
import authApi from "@/api/modules/authApi";
import { LoginCredentials, RegisterCredentials, AuthSuccessResponse, User } from "@/types/auth";

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

export const login = createAsyncThunk<AuthSuccessResponse, LoginCredentials, { rejectValue: string; state: RootState }>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authApi.login(credentials);
            return response.data;
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data.error.message);
        }
    },
);

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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
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
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.jwt;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.jwt);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload || "Login failed";
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.jwt;
                state.user = action.payload.user;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
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

export const { logout, setUser, clearError, loadUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
