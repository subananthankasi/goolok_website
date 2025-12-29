import { SET_LOCATION_SEARCH } from "../Action/GridViewFilterAction";

 


const initialState = {
  LocationSearch: '',  
};

const GridViewFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION_SEARCH:
      return {
        ...state,
        LocationSearch: action.payload,
      };
    default:
      return state;
  }
};

export default GridViewFilterReducer;
