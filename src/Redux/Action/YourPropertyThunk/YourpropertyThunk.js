import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../Api/axiosInstance";
import { LOGIN_BASE_URL } from "../../../Api/api";

export const waitingPropertyThunk = createAsyncThunk(
  "waitingPropertyThunk/data",
  async () => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/enquiry",
      headers: {
        Level: "waiting",
        Authorization: token,
      },
    });
    return response.data;
  }
);
export const progressPropertyThunk = createAsyncThunk(
  "progressPropertyThunk/data",
  async () => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/enquiry",
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);

export const pendingPropertyThunk = createAsyncThunk(
  "pendingPropertyThunk/data",
  async () => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/enquiry",
      headers: {
        Level: "pending",
        Authorization: token,
      },
    });
    return response.data;
  }
);

export const completePropertyThunk = createAsyncThunk(
  "completePropertyThunk/data",
  async () => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/enquiry",
      headers: {
        Level: "live",
        Authorization: token,
      },
    });
    return response.data;
  }
);
