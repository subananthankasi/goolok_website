import { createSlice } from "@reduxjs/toolkit";
import { buyPropertiesThunk } from "../Action/BuyPropertiesThunk";

const buyPropertiesSlice = createSlice({
  name: "buyPropertiesSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(buyPropertiesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(buyPropertiesThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(buyPropertiesThunk.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const BuyPropertiesReducer = buyPropertiesSlice.reducer;
