const INITIAL_STATE = {
  post: null,
  user: null,
};
const selectedItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECT_POST':
      return { ...state, post: action.payload };
    default:
      return { ...state };
  }
};

export default selectedItemReducer;
