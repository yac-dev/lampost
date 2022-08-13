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

export const createPost = (formData) => async (dispatch, getState) => {
  try {
    const result = await lampostAPI.post('/posts', formData);
    const { post } = result.data;
    dispatch({
      type: 'CREATE_POST',
      payload: post,
    });
  } catch (error) {
    console.log(error);
  }
};
