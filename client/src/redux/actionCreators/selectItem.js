import lampostAPI from '../../apis/lampost';
// ここ、毎回http requestするようにした方がいいよな。
export const selectMeetup = (id) => async (dispatch, getState) => {
  const result = await lampostAPI.get(`/meetups/${id}/selected`);
  const { meetup } = result.data;
  dispatch({
    type: 'SELECT_MEETUP',
    payload: meetup,
  });
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
