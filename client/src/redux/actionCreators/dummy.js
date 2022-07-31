export const countUp = () => (dispatch, getState) => {
  console.log(getState().dummy);
  dispatch({
    type: 'COUNT_UP',
    payload: '',
  });
};
