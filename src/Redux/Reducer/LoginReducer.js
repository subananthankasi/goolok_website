import { LOGIN, LOGOUT } from "../Action/LoginAction";

 
 
const initialState = {
  isAuthenticated: false, 
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,  
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,  
      };
    
    default:
      return state;
  }
};

export default LoginReducer;
