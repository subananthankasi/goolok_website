import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_BASE_URL } from "../../Api/api";


export const NotificationGetThunk = createAsyncThunk(
  "NotificationGetThunk/data",
  async () => {
    const token = localStorage.getItem("zxcvbnm@#");
    const response = await axios({
      method: "get",
      url: LOGIN_BASE_URL + "/vendor/notification",
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);
