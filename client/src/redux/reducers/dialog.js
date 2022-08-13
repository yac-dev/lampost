const INITIAL_STATE = {
  confirmCreateMeetup: {
    isOpen: false,
  },
};

const dialogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CONFIRM_CREATE_MEETUP':
      return { ...state, confirmationOfCreateMeetup: { isOpen: true } };
    default:
      return { ...state };
  }
};

export default dialogReducer;
