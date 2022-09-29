import lampostAPI from '../../apis/lampost';

export const createMeetup = (formData) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.post('/meetups', formData);
    const { meetup } = result.data;
    dispatch({
      type: 'CREATE_MEETUP',
      payload: meetup,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetups = () => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.get('/meetups');
    const { meetups } = result.data;
    dispatch({
      type: 'GET_MEETUPS',
      payload: meetups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const joinMeetup = (meetupId) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.patch(`/meetups/${meetupId}/join`);
    const { user } = result.data;
    const { meetup } = result.data;
    dispatch({
      type: 'JOIN_MEETUP',
      payload: { user, meetup },
    });
  } catch (error) {
    console.log(error);
  }
};
