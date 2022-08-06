import lampostAPI from '../../apis/lampost';
import * as SecureStore from 'expo-secure-store';

export const signUp = (formData) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.post('/auth/signup', formData);
    const { user, jwtToken } = result.data;

    await SecureStore.setItemAsync('secure_token', jwtToken);
    dispatch({
      type: 'SIGN_UP',
      payload: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logIn = (formData) => async (dispatch, getState) => {
  try {
    console.log('login');
  } catch (error) {
    console.log(error);
  }
};

export const loadMe = (jwtToken) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.get('/users/loadMe', {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    });
    const { user } = result.data;
    dispatch({
      type: 'LOAD_ME',
      payload: user,
    });
  } catch (error) {
    console.log(error);
  }
};
