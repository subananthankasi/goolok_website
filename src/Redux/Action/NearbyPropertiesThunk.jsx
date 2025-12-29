
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../Api/api";

export const nearbyPropertiesGetThunk = createAsyncThunk(
  "nearbyProperties/get",
  async ({ userLat, userLon, neighborhood, userid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("zxcvbnm@#");

      const response = await axios.get(
        `${API_BASE_URL}/nearbyproperties`,
        {
          headers: {
            "Gl-Status": token ? "true" : "false",
            "Pr-Start": userLat,
            "Pr-End": userLon,
            Level: neighborhood,
            "Pr-Root": userid,
            "Gl-Root": userid,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
