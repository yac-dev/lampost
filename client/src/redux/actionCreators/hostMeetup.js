export const setIsHostMeetupOpen = (bool) => {
  return {
    type: 'SET_HOST_MEETUP_OPEN',
    payload: bool,
  };
};

export const setMeetupLocation = (location) => {
  return {
    type: 'SELECT_LOCATION',
    payload: location,
  };
};
