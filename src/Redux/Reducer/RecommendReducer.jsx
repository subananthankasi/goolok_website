import { createSlice } from "@reduxjs/toolkit";
import { recommendGetThunk } from "../Action/RecommendThunk";

const RecommendGetSlice = createSlice({
    name: "RecommendGetSlice",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    extraReducers(builder) {
        builder.addCase(recommendGetThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(recommendGetThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false;
        });
        builder.addCase(recommendGetThunk.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false;
        });
    }
})

export const RecommendGetReducer = RecommendGetSlice.reducer