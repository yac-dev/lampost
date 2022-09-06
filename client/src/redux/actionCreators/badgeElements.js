import lampostAPI from '../../apis/lampost';
export const getBadgeElements = () => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.get('/badgeelements');
    const { badgeElements } = result.data;
    dispatch({
      type: 'GET_BADGE_ELEMENTS',
      payload: badgeElements,
    });
  } catch (error) {
    console.log(error);
  }
};
