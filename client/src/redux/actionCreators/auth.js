import lampostAPI from '../../apis/lampost';

export const signUp = (formData) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.post('/auth/signup', formData);
    const { user } = result.data;
    dispatch({
      type: 'SIGN_UP',
      payload: user,
    });
  } catch (error) {
    console.log(error);
  }
};
