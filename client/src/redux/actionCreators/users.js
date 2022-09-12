import lampostAPI from '../../apis/lampost';
export const getUser = (_id) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.get(`/users/${_id}`);
    const { user } = result.data;
  } catch (error) {
    console.log(error);
  }
};
