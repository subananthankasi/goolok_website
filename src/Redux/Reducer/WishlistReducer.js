
import { createSlice } from "@reduxjs/toolkit";
import { wishlistDeleteThunk, wishlistGetThunk, wishlistPostThunk, wishlistVerifyThunk } from "../Action/WishlistThunk";

const initialState = {
  wishlistItems: [],
  wishlistCount: 0,
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart Items
      .addCase(wishlistGetThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(wishlistGetThunk.fulfilled, (state, action) => {
        state.wishlistItems = action.payload;
        state.wishlistCount = action.payload.length;
        state.loading = false;
      })
      .addCase(wishlistGetThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add Item to Cart
      .addCase(wishlistPostThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(wishlistPostThunk.fulfilled, (state, action) => {
        state.wishlistItems.push(action.payload);
        state.wishlistCount += 1;
        state.loading = false;
      })
      .addCase(wishlistPostThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Delete Item from Cart
      .addCase(wishlistDeleteThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(wishlistDeleteThunk.fulfilled, (state, action) => {
        const idToRemove = action.payload.id;
        state.wishlistItems = state.wishlistItems.filter(item => item._id !== idToRemove);
        state.wishlistCount = state.wishlistItems.length;
        state.loading = false;
      })
      .addCase(wishlistDeleteThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const wishlistReducer = wishlistSlice.reducer;

const wishlistVerifySlice = createSlice({
    name:"wishlistVerifySlice",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(wishlistVerifyThunk.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(wishlistVerifyThunk.fulfilled,(state,action)=>{
            state.data = action.payload
            state.loading=false;
        });
        builder.addCase(wishlistVerifyThunk.rejected,(state,action)=>{
            state.error = action.payload
            state.loading=false;
        });
    }
})

export const wishlistVerifyReducer = wishlistVerifySlice.reducer