import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../Api/api";


export const recommendGetThunk = createAsyncThunk(
    "recommendGetThunk/data",
    async (userId) => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/recommend`,
            headers: {
                "Gl-Root":String(userId),
            },
        });
        return response.data;
    }
);