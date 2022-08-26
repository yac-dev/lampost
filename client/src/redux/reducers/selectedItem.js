const INITIAL_STATE = {
  meetup: null,
  user: null,
};
const selectedItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECT_MEETUP':
      return { ...state, meetup: action.payload };
    default:
      return { ...state };
  }
};

export default selectedItemReducer;
