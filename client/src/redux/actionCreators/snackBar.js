export const addSnackBar = (message, barType, duration) => (dispatch, getState) => {
  try {
    dispatch({
      type: 'SET_SNACK_BAR',
      payload: { message, barType },
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_SNACK_BAR',
        payload: '',
      });
    }, duration);
  } catch (error) {
    console.log(error);
  }
};

export const removeSnackBar = () => {
  return {
    type: 'REMOVE_SNACK_BAR',
    payload: '',
  };
};
