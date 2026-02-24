import axios from "axios";
import API_BASE_URL from "../../Api/api";
 
export const FETCH_PROPERTY_TYPE = "FETCH_PROPERTY_TYPE"; 
  
 
  const fetchPropertyTypeSuccess = (propertyTypeData) => ({
    type: FETCH_PROPERTY_TYPE,
    payload: propertyTypeData,
});
 

 
 
// Api  
export const fetchPropertyType = () => {
    return async (dispatch) => {
         dispatch({ type: "FETCH_PROPERTY_TYPE_LOADING" });
        try {
            const response = await axios.get(`${API_BASE_URL}/property`);
            // const response = await axios.get(`${LOGIN_BASE_URL}/property`);

            dispatch(fetchPropertyTypeSuccess(response.data));
        } catch (error) {
            console.error('Error fetching property types:', error);
        }
    };
};

 