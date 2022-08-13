const INITIAL_STATE = {
  isOpen: false,
  selectedLocation: null,
};

const holdMeetupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_HOLD_MEETUP_OPEN':
      return { ...state, isOpen: true };
    case 'SELECT_LOCATION':
      return { ...state, selectedLocation: action.payload };
  }
};

export default holdMeetupReducer;
