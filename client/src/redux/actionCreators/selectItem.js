export const selectMeetup = (meetup) => {
  return {
    type: 'SELECT_MEETUP',
    payload: meetup,
  };
};
