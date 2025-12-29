// actions.js
export const SET_LOCATION_SEARCH = 'SET_LOCATION_SEARCH';

export const setLocationSearch = (searchValue) => ({
  type: SET_LOCATION_SEARCH,
  payload: searchValue,
});
