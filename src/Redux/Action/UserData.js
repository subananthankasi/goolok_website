
// // import axiosInstance from "../../../Api/axiosInstance";
// // import PublicRoute from "../../Routes/PublicRoute";

// import axiosInstance from "../../Api/axiosInstance";

   
// export const USER_DATA = "USER_DATA"; 
  
 
//   const fetchUserDataSuccess = (data) => ({
//     type: USER_DATA,
//     payload: data,
//  });
 
 

 
 
// // Api  
// export const fetchUserData = (navigate) => {
//     return async (dispatch) => {
//         try {
//             const response = await axiosInstance.get('/vendor/Webuser');
//             dispatch(fetchUserDataSuccess(response.data));
//           } catch (error) {
//             // await localStorage.removeItem("zxcvbnm@#"); 
//           }
//     };
// };
 

import axiosInstance from "../../Api/axiosInstance";

/* =========================
   Action Types
========================= */
export const USER_DATA_REQUEST = "USER_DATA_REQUEST";
export const USER_DATA_SUCCESS = "USER_DATA_SUCCESS";
export const USER_DATA_FAILURE = "USER_DATA_FAILURE";

/* =========================
   Action Creators
========================= */

// loading start
export const userDataRequest = () => ({
  type: USER_DATA_REQUEST,
});

// success
export const userDataSuccess = (data) => ({
  type: USER_DATA_SUCCESS,
  payload: data,
});

// error
export const userDataFailure = (error) => ({
  type: USER_DATA_FAILURE,
  payload: error,
});

/* =========================
   Thunk API Call
========================= */

export const fetchUserData = () => {
  return async (dispatch) => {
    dispatch(userDataRequest()); // ⏳ loading true

    try {
      const response = await axiosInstance.get("/vendor/Webuser");

      dispatch(userDataSuccess(response.data)); 
    } catch (error) {
      dispatch(
        userDataFailure(
          error.response?.data?.message || "Failed to fetch user data"
        )
      );
    }
  };
};
