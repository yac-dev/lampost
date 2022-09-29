const INITIAL_STATE = {
  meetup: null,
  user: null,
  badges: {},
};
const selectedItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // これは、map上にrenderされているmeetupのobjectをtapした時にredux stateに入れて、それをbottom sheetにtapされたmeetupのdetailを表示する。
    case 'SELECT_MEETUP':
      return { ...state, meetup: action.payload };
    case 'JOIN_MEETUP':
      return { ...state, meetup: { ...state.meetup, totalAttendees: ++state.meetup.totalAttendees } };
    case 'LEAVE_MEETUP':
      return { ...state, meetup: { ...state.meetup, totalAttendees: --state.meetup.totalAttendees } };
    // append
    case 'SELECT_BADGE':
      const selectedBadges = { ...state.badges };
      selectedBadges[action.payload._id] = action.payload;
      return { ...state, badges: selectedBadges };
    case 'REMOVE_BADGE':
      const removingBadges = { ...state.badges };
      const badgeId = action.payload._id;
      delete removingBadges[badgeId];
      return { ...state, badges: removingBadges };
    default:
      return { ...state };
  }
};

export default selectedItemReducer;
