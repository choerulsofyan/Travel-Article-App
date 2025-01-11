// src/store/modules/error/errorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
    message: string | null;
    status: number | null; // Add a status field
}

const initialState: ErrorState = {
    message: null,
    status: null,
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setGlobalError: (state, action: PayloadAction<{ message: string; status?: number | null }>) => {
            state.message = action.payload.message;
            state.status = action.payload.status || null; // Set the status code
        },
        clearGlobalError: (state) => {
            state.message = null;
            state.status = null; // Clear the status code
        },
    },
});

export const { setGlobalError, clearGlobalError } = errorSlice.actions;
export default errorSlice.reducer;
