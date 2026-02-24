import { NOTIFICATION_MESSAGE } from "../Action/NotificationAction";





const initialState = {
    notification: [],
    notificationLoading: false,
}

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NOTIFICATION_LOADING":
            return {
                ...state,
                notificationLoading: true,
            };
        case NOTIFICATION_MESSAGE:
            return {
                ...state,
                notification: action.payload,
                notificationLoading: false,
            };
        default:
            return state;
    }
};

export default NotificationReducer;