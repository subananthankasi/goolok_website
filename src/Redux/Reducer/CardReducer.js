// import { createSlice } from "@reduxjs/toolkit";
// import { cardDeleteThunk, cardGetThunk, cardListThunk, cardPostThunk } from "../Action/AddToCardThunk";


// const cardGetData = createSlice({
//     name:"cardGetData",
//     initialState:{
//         data:[],
//         loading:false,
//         error:null
//     },
//     extraReducers(builder){
//         builder.addCase(cardGetThunk.pending,(state)=>{
//             state.loading=true;
//         });
//         builder.addCase(cardGetThunk.fulfilled,(state,action)=>{
//             state.data = action.payload
//             state.loading=false;
//         });
//         builder.addCase(cardGetThunk.rejected,(state,action)=>{
//             state.error = action.payload
//             state.loading=false;
//         });
//     }
// })

// export const cardReducer = cardGetData.reducer

// const cardPostSlice = createSlice({
//     name:"cardPostSlice",
//     initialState:{
//         data:[],
//         loading:false,
//         error:null
//     },
//     extraReducers(builder){
//         builder.addCase(cardPostThunk.pending,(state)=>{
//             state.loading=true;
//         });
//         builder.addCase(cardPostThunk.fulfilled,(state,action)=>{
//             state.data = action.payload
//             state.loading=false;
//         });
//         builder.addCase(cardPostThunk.rejected,(state,action)=>{
//             state.error = action.payload
//             state.loading=false;
//         });
//     }
// })

// export const cardPostReducer = cardPostSlice.reducer

// const cardDeleteSlice = createSlice({
//     name:"cardDeleteSlice",
//     initialState:{
//         data:[],
//         loading:false,
//         error:null
//     },
//     extraReducers(builder){
//         builder.addCase(cardDeleteThunk.pending,(state)=>{
//             state.loading=true;
//         });
//         builder.addCase(cardDeleteThunk.fulfilled,(state,action)=>{
//             state.data = action.payload
//             state.loading=false;
//         });
//         builder.addCase(cardDeleteThunk.rejected,(state,action)=>{
//             state.error = action.payload
//             state.loading=false;
//         });
//     }
// })

// export const cardDeleteReducer = cardDeleteSlice.reducer


// const cardListeSlice = createSlice({
//     name:"cardListeSlice",
//     initialState:{
//         data:[],
//         loading:false,
//         error:null
//     },
//     extraReducers(builder){
//         builder.addCase(cardListThunk.pending,(state)=>{
//             state.loading=true;
//         });
//         builder.addCase(cardListThunk.fulfilled,(state,action)=>{
//             state.data = action.payload
//             state.loading=false;
//         });
//         builder.addCase(cardListThunk.rejected,(state,action)=>{
//             state.error = action.payload
//             state.loading=false;
//         });
//     }
// })

// export const cardListReducer = cardListeSlice.reducer

import { createSlice } from "@reduxjs/toolkit";
import { cardGetThunk, cardPostThunk, cardDeleteThunk, cardListThunk } from "../Action/AddToCardThunk";

const initialState = {
  cartItems: [],
  cartCount: 0,
  loading: false,
  deleteLoadingId: null,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Cart Items
      .addCase(cardGetThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(cardGetThunk.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.cartCount = action.payload.length;
        state.loading = false;
      })
      .addCase(cardGetThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add Item to Cart
      .addCase(cardPostThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(cardPostThunk.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        state.cartCount += 1;
        state.loading = false;
      })
      .addCase(cardPostThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Delete Item from Cart
      .addCase(cardDeleteThunk.pending, (state,action) => {
         state.deleteLoadingId = action.meta.arg;
      })
      .addCase(cardDeleteThunk.fulfilled, (state, action) => {
        const idToRemove = action.payload.id;
        state.cartItems = state.cartItems.filter(item => item._id !== idToRemove);
        state.cartCount = state.cartItems.length;
       state.deleteLoadingId = null; 
      })
      .addCase(cardDeleteThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.deleteLoadingId = null; 
      });
  },
});

export const cartReducer = cartSlice.reducer;


const cardListeSlice = createSlice({
    name:"cardListeSlice",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(cardListThunk.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(cardListThunk.fulfilled,(state,action)=>{
            state.data = action.payload
            state.loading=false;
        });
        builder.addCase(cardListThunk.rejected,(state,action)=>{
            state.error = action.payload
            state.loading=false;
        });
    }
})

export const cardListReducer = cardListeSlice.reducer