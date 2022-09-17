import lampostAPI from '../../apis/lampost';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

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
    const result = await lampostAPI.post('/auth/login', formData);
    const { user, jwtToken } = result.data;
    await SecureStore.setItemAsync('secure_token', jwtToken);
    dispatch({
      type: 'LOG_IN',
      payload: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadMe = (jwtToken) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.get('/auth/loadMe', {
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

export const logout = () => async (dispatch, getState) => {
  try {
    const id = getState().auth.data._id;
    await SecureStore.deleteItemAsync('secure_token');
    dispatch({
      type: 'LOG_OUT',
      payload: '',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLocation = () => async (dispatch, getState) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // you cannot post any contentって書けばいいかね。
      // setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coordsData = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    //   setPosition((previous) => ({
    //     ...previous,
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //   }));
    // })
    dispatch({
      type: 'GET_CURRENT_LOCATION',
      payload: coordsData,
    });
  } catch (error) {
    console.log(error);
  }
};
