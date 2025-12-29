import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_BASE_URL } from "../../Api/api";


export const wishlistGetThunk = createAsyncThunk(
  "wishlistGetThunk/data",
  async () => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/wishlist",
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);

export const wishlistDeleteThunk = createAsyncThunk(
  "wishlistDeleteThunk/data",
  async (eid) => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "delete",
      url: LOGIN_BASE_URL + "/vendor/wishlist/"+ eid,
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);
export const wishlistPostThunk = createAsyncThunk(
  "wishlistPostThunk/data",
  async (values) => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "post",
      url: LOGIN_BASE_URL + "/vendor/wishlist",
      data:values,
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);

export const wishlistVerifyThunk = createAsyncThunk(
  "wishlistVerifyThunk/data",
  async (eid) => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/wishlist/" + eid +"/edit",
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);

