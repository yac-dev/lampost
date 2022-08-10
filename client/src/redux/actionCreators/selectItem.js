export const selectPost = (post) => {
  return {
    type: 'SELECT_POST',
    payload: post,
  };
};
