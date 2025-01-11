import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
    message: string | null;
    status: number | null;
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
            state.status = action.payload.status || null;
        },
        clearGlobalError: (state) => {
            state.message = null;
            state.status = null;
        },
    },
});

export const { setGlobalError, clearGlobalError } = errorSlice.actions;
export default errorSlice.reducer;
