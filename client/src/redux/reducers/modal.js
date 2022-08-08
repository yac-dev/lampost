const INITIAL_STATE = {
  bottomSheet: {
    isOpen: false,
  },
};
const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_BOTTOM_SHEET':
      return { ...state, bottomSheet: { isOpen: action.payload } };
    default:
      return { ...state };
  }
};

export default modalReducer;
