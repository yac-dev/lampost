import lampostAPI from '../../apis/lampost';

export const signUp = (formData) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.post('/auth/signup', formData);
  } catch (error) {
    console.log(error);
  }
};
