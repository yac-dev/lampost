const INITIAL_STATE = { data: null, isAuthenticated: false };
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_UP':
    case 'LOG_IN':
    case 'LOAD_ME':
      return { ...state, data: action.payload, isAuthenticated: true };
    default:
      return { ...state };
  }
};

export default authReducer;
