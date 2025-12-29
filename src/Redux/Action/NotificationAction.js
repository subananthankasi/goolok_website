import { LOGIN_BASE_URL } from "../../Api/api";
import axiosInstance from "../../Api/axiosInstance";

export const NOTIFICATION_MESSAGE = "NOTIFICATION_MESSAGE";

const fetchNotificationMsgSuccess = (data) => ({
  type: NOTIFICATION_MESSAGE,
  payload: data,
});

// Api
export const fetchNotificationMsg = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get("/vendor/notification");

      dispatch(fetchNotificationMsgSuccess(response.data));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
};

export const fetchNotificationMsgUpdate = (updateData) => {
  return async (dispatch) => {
    try {
      await axiosInstance.put(
        `/vendor/notification/${updateData.id}`,
        updateData,
        {
          //  await LOGIN_BASE_URL.put(`/vendor/notification/${updateData.id}`, updateData, {

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchNotificationMsg());
    } catch (error) {
      console.error(
        "Error fetching data",
        error.response ? error.response.data : error.message
      );
    }
  };
};
