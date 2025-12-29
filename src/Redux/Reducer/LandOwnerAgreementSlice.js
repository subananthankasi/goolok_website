import { createSlice } from "@reduxjs/toolkit";
import { landAgreePdfThunk } from "../Action/LandOwnerAgreement";

const agreeSlice = createSlice({
    name:"agree",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(landAgreePdfThunk.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(landAgreePdfThunk.fulfilled,(state,action)=>{
            state.data = action.payload
            state.loading=false;
        });
        builder.addCase(landAgreePdfThunk.rejected,(state,action)=>{
            state.error = action.payload
            state.loading=false;
        });
    }
})

export const agreeSliceReducer = agreeSlice.reducer