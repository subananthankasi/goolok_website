import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_BASE_URL } from "../../Api/api";


export const cardGetThunk = createAsyncThunk(
  "cardGetThunk/data",
  async (id) => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/shoppingcart",
      headers: {
        Authorization: token,
        "Gl-Status":id
      },
    });
    return response.data;
  }
);

export const cardDeleteThunk = createAsyncThunk(
  "cardDeletThunk/data",
  async (eid) => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "delete",
      url: LOGIN_BASE_URL + "/vendor/shoppingcart/"+ eid,
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);
export const cardPostThunk = createAsyncThunk(
  "cardPostThunk/data",
  async (values) => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "post",
      url: LOGIN_BASE_URL + "/vendor/shoppingcart",
      data:values,
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);

export const cardListThunk = createAsyncThunk(
  "cardListThunk/data",
  async (eid) => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/shoppingcart/" + eid +"/edit",
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);

