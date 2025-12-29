import { createSlice } from "@reduxjs/toolkit";
import { NotificationGetThunk } from "../Action/NotificationThunk";

const NotificationGetSlice = createSlice({
    name:"NotificationGetSlice",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers(builder){
        builder.addCase(NotificationGetThunk.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(NotificationGetThunk.fulfilled,(state,action)=>{
            state.data = action.payload
            state.loading=false;
        });
        builder.addCase(NotificationGetThunk.rejected,(state,action)=>{
            state.error = action.payload
            state.loading=false;
        });
    }
})

export const NotificationGetReducer = NotificationGetSlice.reducer