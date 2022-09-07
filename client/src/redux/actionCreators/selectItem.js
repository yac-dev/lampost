export const selectMeetup = (meetup) => {
  return {
    type: 'SELECT_MEETUP',
    payload: meetup,
  };
};

export const selectBadge = (badge) => {
  return {
    type: 'SELECT_BADGE',
    payload: badge,
  };
};

export const removeBadge = (badge) => {
  return {
    type: 'REMOVE_BADGE',
    payload: badge,
  };
};
