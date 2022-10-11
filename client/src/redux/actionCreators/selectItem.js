import lampostAPI from "../../apis/lampost";
// ここ、毎回http requestするようにした方がいいよな。
export const selectMeetup = id => async (dispatch, getState) => {
  const result = await lampostAPI.get(`/meetups/${id}/selected`);
  const {meetup} = result.data;
  dispatch({
    type: "SELECT_MEETUP",
    payload: meetup
  });
};

export const addComment = (formData) => async (dispatch, getState) => {
  try {
    const { id } = getState().selectedItem.meetup;
    const result = await lampostAPI.post(`/meetups/${id}/ask`, { formData });
    const { meetup } = result.data;
    dispatch({
      type: "ADD_COMMENT",
      payload: meetup
    });
  } catch (error) {
    console.log(error);
  }
};

export const selectBadge = badge => {
  return {
    type: "SELECT_BADGE",
    payload: badge
  };
};

export const removeBadge = badge => {
  return {
    type: "REMOVE_BADGE",
    payload: badge
  };
};
