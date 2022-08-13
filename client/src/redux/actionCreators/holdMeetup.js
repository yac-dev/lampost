export const setIsHoldMeetupOpen = (bool) => {
  return {
    type: 'SET_HOLD_MEETUP_OPEN',
    payload: bool,
  };
};

export const selectMeetupLocation = (location) => {
  return {
    type: 'SELECT_LOCATION',
    payload: location,
  };
};
