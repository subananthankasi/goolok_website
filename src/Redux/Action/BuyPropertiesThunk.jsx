import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../Api/api";

const userId = localStorage.getItem("userid")
export const buyPropertiesThunk = createAsyncThunk(
  "buyPropertiesThunk/data",
  async ({
    selectedFilters = [],
    landType = "",
    searchValue="",
    payload = {},
  } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties`, {
        headers: {
          Level: selectedFilters.join(","),
          "Pr-Root": landType,
          "Gl-Status": JSON.stringify(payload),
          "Gl-Type":searchValue,
          "Gl-Root":userId
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  }
);
