import { NOTIFICATION_MESSAGE } from "../Action/NotificationAction";
 
 
 
 

const initialState ={
    notification: []
}

const NotificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case NOTIFICATION_MESSAGE:
            return {
                ...state,
                notification: action.payload
            }; 
        default:
            return state;
    }
}

export default NotificationReducer;