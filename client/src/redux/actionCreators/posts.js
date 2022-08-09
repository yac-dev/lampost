import lampostAPI from '../../apis/lampost';

export const getPosts = () => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.get('/posts/');
    const { posts } = result.data;
    dispatch({
      type: 'GET_POSTS',
      payload: posts,
    });
  } catch (error) {
    console.log(error);
  }
};
