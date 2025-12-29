import { createSlice } from "@reduxjs/toolkit";
import { nearbyPropertiesGetThunk } from "../Action/NearbyPropertiesThunk";

const nearByPropertiesGetSlice = createSlice({
  name: "nearByPropertiesGetSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(nearbyPropertiesGetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(nearbyPropertiesGetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || []; // API returns {data: [...]}
      })

      .addCase(nearbyPropertiesGetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Something went wrong";
      });
  },
});

export const nearByPropertiesReducer = nearByPropertiesGetSlice.reducer;
