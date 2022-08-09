const INITIAL_STATE = { data: null, isAuthenticated: false, currentLocation: { latitude: null, longitude: null } };
// if contitionでは、latitude === nullってかかないとだな。lat 0, lng 0ってあり得るからね。
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_UP':
    case 'LOG_IN':
    case 'LOAD_ME':
      return { ...state, data: action.payload, isAuthenticated: true };
    case 'GET_CURRENT_LOCATION':
      return { ...state, currentLocation: { latitude: action.payload.latitude, longitude: action.payload.longitude } };
    default:
      return { ...state };
  }
};

export default authReducer;
