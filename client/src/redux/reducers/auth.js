const INITIAL_STATE = {
  data: null,
  isAuthenticated: false,
  currentLocation: { latitude: null, longitude: null },
  socket: null,
};
// if contitionでは、latitude === nullってかかないとだな。lat 0, lng 0ってあり得るからね。
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_UP':
    case 'LOG_IN':
    case 'LOAD_ME':
      return { ...state, data: action.payload, isAuthenticated: true };
    case 'LOG_OUT':
      return { ...state, data: null, isAuthenticated: false, currentLocation: null, socketId: null };
    case 'JOIN_MEETUP':
      return {
        ...state,
        data: { ...state.data, upcomingMeetups: [...state.data.upcomingMeetups, action.payload.id] },
      };
    case 'LEAVE_MEETUP':
      return {
        ...state,
        data: {
          ...state.data,
          upcomingMeetups: [...state.data.upcomingMeetups].filter((meetup) => meetup._id !== action.payload.id),
        },
      }; // ここ、filterする感じ。
    case 'GET_CURRENT_LOCATION':
      return { ...state, currentLocation: { latitude: action.payload.latitude, longitude: action.payload.longitude } };
    case 'GET_SOCKET':
      return { ...state, socket: action.payload };
    default:
      return { ...state };
  }
};

export default authReducer;
