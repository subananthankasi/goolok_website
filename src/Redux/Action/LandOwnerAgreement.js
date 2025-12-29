import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL, { LOGIN_BASE_URL } from "../../Api/api";

export const landAgreePdfThunk = createAsyncThunk('post/data',
    async (id) => {
        const token = localStorage.getItem('zxcvbnm@#')
        const response = await axios({
            method: 'post',
            url: LOGIN_BASE_URL +"/vendor/signedagree",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            data:id
        })
        return response.data
    }
)