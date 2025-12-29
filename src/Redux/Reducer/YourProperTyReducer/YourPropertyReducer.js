import { createSlice } from "@reduxjs/toolkit";
import { 
    completePropertyThunk, 
    pendingPropertyThunk, 
    progressPropertyThunk, 
    waitingPropertyThunk 
} from "../../Action/YourPropertyThunk/YourpropertyThunk";


const handleThunkReducers = (builder, key, thunk) => {
    builder.addCase(thunk.pending, (state) => {
        state[key].loading = true;
        state[key].error = null;
    });
    builder.addCase(thunk.fulfilled, (state, action) => {
        state[key].data = action.payload;
        state[key].loading = false;
    });
    builder.addCase(thunk.rejected, (state, action) => {
        state[key].error = action.error?.message || "An error occurred";
        state[key].loading = false;
    });
};

const yourPropertySlice = createSlice({
    name: 'yourPropertySlice',
    initialState: {
        waiting: { data: [], loading: false, error: null },
        pending: { data: [], loading: false, error: null },
        progress: { data: [], loading: false, error: null },
        complete: { data: [], loading: false, error: null },
    },
    extraReducers: (builder) => {
        handleThunkReducers(builder, 'waiting', waitingPropertyThunk);
        handleThunkReducers(builder, 'progress', progressPropertyThunk);
        handleThunkReducers(builder, 'pending', pendingPropertyThunk);
        handleThunkReducers(builder, 'complete', completePropertyThunk);
    },
});

export const yourPropertyReducer = yourPropertySlice.reducer;
