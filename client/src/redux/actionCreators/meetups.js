import lampostAPI from '../../apis/lampost';
import { addSnackBar } from './snackBar';

export const createMeetup = (formData) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.post('/meetups', formData);
    const { meetup } = result.data;
    dispatch({
      type: 'CREATE_MEETUP',
      payload: meetup,
    });
    dispatch(addSnackBar('Meetup was made successfully!', 'success', 7000));
    const { socket } = getState().auth;
    socket.emit('CREATE_MEETUP', { meetup });
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
    const userId = getState().auth.data._id;
    const result = await lampostAPI.patch(`/meetups/${meetupId}/join`, { user: userId });
    const { id, attendees } = result.data;
    console.log('fuck', id);
    dispatch({
      type: 'JOIN_MEETUP',
      payload: { id, attendees },
    });
    dispatch(addSnackBar('Joined the meetup!', 'success', 7000));
  } catch (error) {
    console.log(error);
  }
};

export const leaveMeetup = (meetupId) => async (dispatch, getState) => {
  try {
    const userId = getState().auth.data._id;
    const result = await lampostAPI.patch(`/meetups/${meetupId}/leave`, { user: userId });
    const { id, attendees } = result.data;
    dispatch({
      type: 'LEAVE_MEETUP',
      payload: { id, attendees },
    });
    dispatch(addSnackBar('Left the meetup!', 'success', 7000));
  } catch (error) {
    console.log(error);
  }
};
