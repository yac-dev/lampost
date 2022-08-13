export const confirmCreateMeetup = (bool) => {
  return {
    type: 'CONFIRM_CREATE_MEETUP',
    payload: bool,
  };
};
