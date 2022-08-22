const INITIAL_STATE = {};

const meetupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_MEETUPS':
      const meetups = {};
      action.payload.forEach((meetup) => {
        meetups[meetup._id] = meetup;
      });
      return { ...state, ...meetups };
    // 新しくできたmeetupを足していく感じ。
    case 'CREATE_MEETUP':
      return { ...state };
    default:
      return { ...state };
  }
};

export default meetupsReducer;
