// // import { USER_DATA } from "../Action/UserData";

// import { USER_DATA } from "../Action/UserData";

// // import { USER_DATA } from "../Action/YourPropertyThunk/UserData";

 
 
 

// const initialState ={
//     userData: []
// }

// const UserDataReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case USER_DATA:
            
//             return {
//                 ...state,
//                 userData: action.payload
//             }; 
           
           
//         default:
//             return state;
//     }
// }

// export default UserDataReducer;

import {
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
} from "../Action/UserData";

const initialState = {
  userData: [],
  loading: false,
  error: null,
};

const UserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };

    case USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UserDataReducer;
