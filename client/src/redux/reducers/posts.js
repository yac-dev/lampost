const INITIAL_STATE = {};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      const posts = {};
      action.payload.forEach((post) => {
        posts[post._id] = post;
      });
      return { ...state, ...posts };
    default:
      return { ...state };
  }
};

export default postsReducer;
