const INITIAL_STATE = {
  isOpen: false,
  setLocation: null,
};

const hostMeetupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_HOST_MEETUP_OPEN':
      return { ...state, isOpen: action.payload };
    case 'SELECT_LOCATION':
      return { ...state, setLocation: action.payload };
    default:
      return { ...state };
  }
};

export default hostMeetupReducer;
