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
    // append
    case 'SELECT_BADGE':
      const selectedBadges = { ...state.badges };
      selectedBadges[action.payload.id] = action.payload;
      return { ...state, badges: selectedBadges };
    default:
      return { ...state };
  }
};

export default selectedItemReducer;
